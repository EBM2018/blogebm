import {getByClass, getById, ready} from "./toolbox.js";
import {createNewParagraphField, createNewTextareaField} from "./paragraphsFormatter.js";
import {addNewParagraphToContentField} from "./paragraphsCreator.js";
import {HTTPVerbs, makeAjaxRequest} from "./ajax.js";

const contentField = getById('content-field');
const addParagraphButton = getById('add-paragraph-button');
const baseUri = window.location.pathname.slice(0, window.location.pathname.length - "/edit".length);
const baseRequestUri = `${baseUri}/paragraphs`;
const articleEditionForm = getById('article-edition-form');

const requestTypes = {
    CREATE_PARAGRAPH: 0,
    CHANGE_PARAGRAPH_CONTENT: 1,
    CHANGE_PARAGRAPHS_ORDER: 2,
    DELETE_PARAGRAPH: 3
};

const onReady = () => {
    const paragraphs = getByClass('lecture-mode-paragraph');
    for (const paragraph of paragraphs)
        paragraph.addEventListener('click', () => replaceParagraphWithTextarea(paragraph));
    addParagraphButton.addEventListener('click', () => {
        const newTextarea = addNewParagraphToContentField();
        newTextarea.addEventListener('keydown', (event) => onTextareaKeyup(event, newTextarea));
    });
};

const onTextareaKeyup = (event, textarea) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Don't add a new line when pressing Enter
        sendRequest(
            textarea.dataset.type === "new" ? requestTypes.CREATE_PARAGRAPH : requestTypes.CHANGE_PARAGRAPH_CONTENT,
            {content: textarea.value, _token: getCsrfToken()},
            () => replaceTextareaWithParagraph(textarea),
            textarea.dataset.id
        );
    }
};

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

const replaceParagraphWithTextarea = (paragraphNode) => {
    // Extract info from paragraph node
    const id = parseInt(paragraphNode.dataset.id);
    const content = paragraphNode.innerHTML;

    // Replace paragraph node
    const paragraphField = getById(`paragraph-field-${id}`);
    const newParagraphField = createNewTextareaField({isNew: false, id: id});
    const newTextarea = newParagraphField.getElementsByClassName("paragraph")[0];
    newTextarea.value = content;
    contentField.replaceChild(newParagraphField, paragraphField);

    // Add Enter key listener
    newTextarea.addEventListener('keydown', (event) => onTextareaKeyup(event, newTextarea));
};

const replaceTextareaWithParagraph = (paragraphTextarea) => {
    // Replace paragraph node
    const id = paragraphTextarea.dataset.id;
    const paragraphField = getById(`paragraph-field-${id}`);
    const newParagraphField = createNewParagraphField(id);
    const newParagraph = newParagraphField.getElementsByClassName("paragraph")[0];
    newParagraph.innerHTML = paragraphTextarea.value;
    contentField.replaceChild(newParagraphField, paragraphField);

    // Add click listener
    newParagraph.addEventListener('click', () => replaceParagraphWithTextarea(newParagraph));
};

const getCsrfToken = () => {
    const serializedForm = Array.from(new FormData(articleEditionForm));
    return serializedForm[0][1];
};

const handleFormErrors = (errors) => {
    // TODO : Display errors below the relevant fields
    console.log(errors)
};

ready(onReady);