import {ready, getById, remove} from "./toolbox.js";

const addParagraphButton = getById('add-paragraph-button');
const contentField = getById('content-field');
const newParagraphInitialInput = getById('new-paragraph-initial-input');
const paragraphsIDs = [];

/**
 * Adds a new paragraph to the content of the article
 * Stores the numeric id of the new paragraph in a list
 */
const addNewParagraphToContentField = () => {
    // Get a unique new paragraph id
    const newParagraphID = Math.max(...paragraphsIDs, 0) + 1;
    paragraphsIDs.push(newParagraphID);

    // Add the new paragraph field
    const newParagraphField = createNewTextareaElement(newParagraphID);
    contentField.appendChild(newParagraphField);
    const newTextarea = newParagraphField.getElementsByClassName("paragraph")[0];

    // Setup its default value
    newTextarea.value = newParagraphInitialInput.value != null && newParagraphInitialInput.value.length > 0 ?
        newParagraphInitialInput.value : "Nouveau paragraphe";

    // Clear initial input after use
    newParagraphInitialInput.value = "";

    // Steal focus
    newTextarea.focus();
};

/**
 * Creates a new textarea DOM element
 * @param {int} id
 * @returns {HTMLElement}
 */
const createNewTextareaElement = (id) => {
    // Textarea subnode
    const newTextarea = document.createElement("textarea");
    newTextarea.classList.add("textarea", "paragraph");
    newTextarea.placeholder = "...";
    newTextarea.dataset.type = "new";

    const textareaControl = document.createElement("div");
    textareaControl.classList.add("control", "is-expanded");
    textareaControl.appendChild(newTextarea);

    // Close button subnode
    const textareaCloseButton = document.createElement("a");
    textareaCloseButton.classList.add("delete", "close-paragraph-button");

    const textareaCloseButtonControl = document.createElement("div");
    textareaCloseButtonControl.classList.add("control");
    textareaCloseButtonControl.style.display = 'none'; // Hide the button by default
    textareaCloseButtonControl.appendChild(textareaCloseButton);

    // Main node
    const newField = document.createElement("div");
    newField.classList.add("field", "has-addons", "paragraph-field");
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

ready(() => addParagraphButton.addEventListener('click', addNewParagraphToContentField));



