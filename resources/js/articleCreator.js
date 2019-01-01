import {getByClass, getById, ready} from "./toolbox.js";
import {HTTPVerbs, makeAjaxRequest} from "./ajax.js";
import {addNewParagraphToContentField} from "./paragraphsCreator.js";

const addParagraphButton = getById('add-paragraph-button');
const articleCreationConfirmationButton = getById('article-creation-confirmation-button');
const articleCreationForm = getById('article-creation-form');
const homeURL = '/';
const formReceiverURL = '/articles';

/**
 * Handles a click on the confirm button
 */
const onConfirm = () => {
    const formattedForm = prepareFormData();
    sendForm(formattedForm);
};

/**
 * Prepares the form data to be sent
 * @returns {Object}
 */
const prepareFormData = () => {
    // Serialize the form
    const serializedForm = Array.from(new FormData(articleCreationForm));

    // Format it as a PHP array (key => value)
    const formattedForm = {};
    for (const elem of serializedForm) formattedForm[elem[0]] = elem[1];

    // Add the paragraphs (as they are not serialized)
    const paragraphs = [];
    for (const textarea of getByClass('paragraph')) paragraphs.push(textarea.value);
    formattedForm.paragraphs = paragraphs;

    return formattedForm;
};

/**
 * Sends the formatted form to the server
 * @param {Object} form
 */
const sendForm = (form) => {
    const successCallback = () => window.location.href = homeURL;
    const errorCallback = (response) => handleFormErrors(JSON.parse(response).errors);
    makeAjaxRequest(HTTPVerbs.POST, formReceiverURL, JSON.stringify(form), successCallback, errorCallback);
};

/**
 * Handles form errors to give feedback to the user
 * @param {Object} errors
 */
const handleFormErrors = (errors) => {
    // TODO : Display errors below the relevant fields
    console.log(errors)
};

/**
 * The entry function called when DOM loading is finished.
 */
const onReady = () => {
    addParagraphButton.addEventListener('click', addNewParagraphToContentField);
    articleCreationConfirmationButton.addEventListener('click', onConfirm);
};

ready(onReady);