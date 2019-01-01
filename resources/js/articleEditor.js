import {getByClass, getById, ready, remove} from "./toolbox.js";
import {createNewParagraphField, createNewTextareaField} from "./paragraphsFormatter.js";
import {addNewParagraphToContentField} from "./paragraphsCreator.js";
import {HTTPVerbs, makeAjaxRequest} from "./ajax.js";
import {dragendHandler, dragstartHandler} from "./draggingToolbox.js";

const contentField = getById('content-field');
const addParagraphButton = getById('add-paragraph-button');
const baseUri = window.location.pathname.slice(0, window.location.pathname.length - "/edit".length); // Remove the /edit from the url
const baseRequestUri = `${baseUri}/paragraphs`;
const articleEditionForm = getById('article-edition-form');

/**
 * An enumeration of request types made from the article edition page
 * @type {{CREATE_PARAGRAPH: number, CHANGE_PARAGRAPH_CONTENT: number, CHANGE_PARAGRAPHS_ORDER: number, DELETE_PARAGRAPH: number}}
 */
const requestTypes = {
    CREATE_PARAGRAPH: 0,
    CHANGE_PARAGRAPH_CONTENT: 1,
    CHANGE_PARAGRAPHS_ORDER: 2,
    DELETE_PARAGRAPH: 3
};

let numberOfParagraphsUnderEdition = 0;

/**
 * The entry function called when DOM loading is finished.
 */
const onReady = () => {
    const paragraphs = getByClass('lecture-mode-paragraph');
    for (const paragraph of paragraphs)
        paragraph.addEventListener('click', () => replaceParagraphWithTextarea(paragraph));
    addParagraphButton.addEventListener('click', () => {
        const newTextarea = addNewParagraphToContentField();
        const newCloseButton = newTextarea.parentElement.parentElement.getElementsByClassName("close-paragraph-button")[0];
        newTextarea.addEventListener('keydown', (event) => onTextareaKeyup(event, newTextarea));
        newCloseButton.addEventListener('click', () => updateParagraphsCounter(-1));
        updateParagraphsCounter(1);
    });
    for (const paragraphField of getByClass('paragraph-field')) {
        paragraphField.addEventListener('dragstart', (event) => dragstartHandler(
            event,
            'paragraph-field',
            contentField,
            prepareOrderChangeRequest));
        paragraphField.addEventListener('dragend', (event) => dragendHandler(event));
    }
};

/**
 * Textarea keyup event handler
 * @param {Event} event
 * @param {Element} textarea
 */
const onTextareaKeyup = (event, textarea) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Don't add a new line when pressing Enter

        const payload = {content: textarea.value, _token: getCsrfToken()};
        if (textarea.dataset.type === "new") {
            sendRequest(
                requestTypes.CREATE_PARAGRAPH,
                payload,
                (response) => replaceTextareaWithParagraph(textarea, JSON.parse(response).paragraph_id),
                null
            );
        } else {
            sendRequest(
                requestTypes.CHANGE_PARAGRAPH_CONTENT,
                payload,
                () => replaceTextareaWithParagraph(textarea),
                textarea.dataset.id
            );
        }
    }
};

/**
 * Prepares a paragraphs order change request
 */
const prepareOrderChangeRequest = () => {
    // Prepare payload
    const paragraphsInfo = [];
    let order = 1;
    for (const paragraph of getByClass('paragraph')) {
        paragraphsInfo.push({
            id: parseInt(paragraph.dataset.id),
            order: order
        });
        order++;
    }
    const payload = {
        _token: getCsrfToken(),
        paragraphs: paragraphsInfo
    };

    sendRequest(requestTypes.CHANGE_PARAGRAPHS_ORDER,
        payload,
        () => {},
        null
    );
};

/**
 * Prepares and sends the page's ajax request
 * @param {int} requestType The type of request, enumerated above
 * @param {Object} payload The payload of the request
 * @param {function} successCallback The function to call when the request is successful
 * @param {int} paragraph_id A optional parameter precising the relevant paragraph id when modifying its content or
 * deleting it
 */
const sendRequest = (requestType, payload, successCallback, paragraph_id) => {
    const errorCallback = (response) => handleFormErrors(JSON.parse(response).errors);
    let HTTPVerb, formReceiverURL;
    switch (requestType) {
        case requestTypes.CREATE_PARAGRAPH:
            HTTPVerb = HTTPVerbs.POST;
            formReceiverURL = baseRequestUri;
            break;
        case requestTypes.DELETE_PARAGRAPH:
            HTTPVerb = HTTPVerbs.DELETE;
            formReceiverURL = `${baseRequestUri}/${paragraph_id}`;
            break;
        case requestTypes.CHANGE_PARAGRAPH_CONTENT:
            HTTPVerb = HTTPVerbs.PATCH;
            formReceiverURL = `${baseRequestUri}/${paragraph_id}`;
            break;
        case requestTypes.CHANGE_PARAGRAPHS_ORDER:
            HTTPVerb = HTTPVerbs.PATCH;
            formReceiverURL = baseRequestUri;
            break;
    }
    makeAjaxRequest(HTTPVerb, formReceiverURL, JSON.stringify(payload), successCallback, errorCallback);
};

/**
 * Replaces a paragraph-type node tree with a textarea-type node tree
 * @param {Element} paragraphNode
 */
const replaceParagraphWithTextarea = (paragraphNode) => {
    // Extract info from paragraph node
    const id = parseInt(paragraphNode.dataset.id);
    const content = paragraphNode.innerHTML;

    // Replace paragraph node
    const paragraphField = getById(`paragraph-field-${id}`);
    const newParagraphField = createNewTextareaField({isNew: false, id: id, noclose: true});
    const newTextarea = newParagraphField.getElementsByClassName("paragraph")[0];
    const newParagraphCloseButton = newParagraphField.getElementsByClassName("close-paragraph-button")[0];
    newTextarea.value = content;
    newParagraphCloseButton.addEventListener('click', () => {
        sendRequest(
            requestTypes.DELETE_PARAGRAPH,
            {_token: getCsrfToken()},
            () => {
                remove(getById(`paragraph-field-${id}`));
                updateParagraphsCounter(-1);
            },
            id
        );
    });
    contentField.replaceChild(newParagraphField, paragraphField);

    // Add Enter key listener
    newTextarea.addEventListener('keydown', (event) => onTextareaKeyup(event, newTextarea));

    updateParagraphsCounter(1);
};

/**
 * Replaces a textarea-type paragraph node tree with a paragraph-type node tree
 * @param {Element} paragraphTextarea
 * @param {int} newId An optional parameter used to force a new id on the paragraph to create
 * This is used after sending a new paragraph to the database as the id that was generated on the page may not
 * be the same as the one that will be given to the new paragraph in the database.
 * This id is received in the response of the paragraph creation request.
 * If this field was empty after creating a paragraph, the temporary id would be used when sending further modification
 * requests rather than the actual id the paragraph has in the database.
 */
const replaceTextareaWithParagraph = (paragraphTextarea, newId) => {
    // Replace paragraph node
    const id = paragraphTextarea.dataset.id;
    const paragraphReplacementId = newId != null ? newId : id;
    const paragraphField = getById(`paragraph-field-${id}`);
    const newParagraphField = createNewParagraphField(paragraphReplacementId);
    const newParagraph = newParagraphField.getElementsByClassName("paragraph")[0];
    newParagraph.innerHTML = paragraphTextarea.value;
    contentField.replaceChild(newParagraphField, paragraphField);

    // Add click listener
    newParagraph.addEventListener('click', () => replaceParagraphWithTextarea(newParagraph));

    // Add dragging logic
    newParagraphField.draggable = true;
    newParagraphField.addEventListener('dragstart', (event) => dragstartHandler(
        event,
        'paragraph-field',
        contentField,
        prepareOrderChangeRequest));
    newParagraphField.addEventListener('dragend', (event) => dragendHandler(event));

    updateParagraphsCounter(-1);
};

/**
 * Retrieves te Csrf token from the form
 * @returns {FormDataEntryValue} The Csrf token
 */
const getCsrfToken = () => {
    const serializedForm = Array.from(new FormData(articleEditionForm));
    return serializedForm[0][1];
};

/**
 * Enables or disables drag and drop for paragraphs
 * @param {boolean} bool If true, paragraphs are made draggable. If false, paragraphs are no longer draggable.
 */
const enableDragAndDrop = (bool) => {
    const paragraphFields = getByClass('paragraph-field');
    for (const paragraphField of paragraphFields) paragraphField.draggable = bool;
};

/**
 * Updates the paragraphs counter with an incremental value and checks if drag and drop has to be disabled or re-enabled
 * @param {int} increment
 */
const updateParagraphsCounter = (increment) => {
    numberOfParagraphsUnderEdition += increment;
    enableDragAndDrop(numberOfParagraphsUnderEdition === 0);
};

/**
 * Handles form errors to give feedback to the user
 * @param {Object} errors
 */
const handleFormErrors = (errors) => {
    // TODO : Display errors below the relevant fields
    console.log(errors)
};

ready(onReady);