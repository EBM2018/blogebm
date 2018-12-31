import {ready, getById, remove} from "./toolbox.js";

const addParagraphButton = getById('add-paragraph-button');
const contentField = getById('content-field');
const paragraphsIDs = [];

/**
 * Adds a new paragraph to the content of the article
 * Stores the numeric id of the new paragraph in a list
 */
const addNewParagraphToContentField = () => {
    const newParagraphID = Math.max(...paragraphsIDs, 0) + 1;
    paragraphsIDs.push(newParagraphID);
    const newTextarea = createNewTextareaElement(newParagraphID);
    contentField.appendChild(newTextarea);
    newTextarea.getElementsByClassName("paragraph")[0].focus();
};

/**
 * Creates a new textarea DOM element
 * @param {int} id
 * @returns {HTMLElement}
 */
const createNewTextareaElement = (id) => {
    // Textarea subnode
    const newTextarea = document.createElement("textarea");
    newTextarea.classList.add("textarea");
    newTextarea.classList.add("paragraph");
    newTextarea.placeholder = "...";
    newTextarea.id = `paragraph-${id}`;

    const textareaControl = document.createElement("div");
    textareaControl.classList.add("control");
    textareaControl.classList.add("is-expanded");
    textareaControl.appendChild(newTextarea);

    // Close button subnode
    const textareaCloseButton = document.createElement("a");
    textareaCloseButton.classList.add("delete");
    textareaCloseButton.classList.add("close-paragraph-button");

    const textareaCloseButtonControl = document.createElement("div");
    textareaCloseButtonControl.classList.add("control");
    textareaCloseButtonControl.style.display = 'none';
    textareaCloseButtonControl.appendChild(textareaCloseButton);

    // Main node
    const newField = document.createElement("div");
    newField.classList.add("field");
    newField.classList.add("has-addons");
    newField.classList.add("paragraph-field");
    newField.id = `paragraph-field-${id}`;
    newField.appendChild(textareaControl);
    newField.appendChild(textareaCloseButtonControl);

    // Add listener to close paragraph button
    textareaCloseButton.addEventListener('click', () => remove(getById(`paragraph-field-${id}`)));

    // Add listeners related to close button visibility
    newField.addEventListener('mouseenter', () => textareaCloseButtonControl.style.display = null);
    newField.addEventListener('mouseleave', () => textareaCloseButtonControl.style.display = 'none');


    return newField;
};

/**
 * Gets a paragraph DOM element based on its numeric id
 * @param {int} id
 * @returns {Element}
 */
const getParagraphByID = (id) => {
    return getById(`paragraph-${id}`);
};

ready(() => addParagraphButton.addEventListener('click', addNewParagraphToContentField));



