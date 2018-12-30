import {getById, ready} from "./toolbox.js";

const articleCreationConfirmationButton = getById('article-creation-confirmation-button');
const articleCreationForm = getById('article-creation-form');
const contentField = getById('content-field');

/**
 * Handles a click on the confirm button
 */
const onConfirm = () => {
    const formattedForm = prepareFormData();
    console.log(formattedForm);
};

/**
 * Prepares the form data to be sent
 * @returns {Object}
 */
const prepareFormData = () => {
    const serializedForm = Array.from(new FormData(articleCreationForm));
    const formattedForm = {};
    for (const elem of serializedForm) formattedForm[elem[0]] = elem[1];
    const paragraphs = [];
    for (const childNode of contentField.childNodes) {
        if (childNode.classList != null && childNode.classList.contains('textarea')) paragraphs.push(childNode.value);
    }
    formattedForm.paragraphs = paragraphs;
    return formattedForm;
};

ready(() => articleCreationConfirmationButton.addEventListener('click', onConfirm));