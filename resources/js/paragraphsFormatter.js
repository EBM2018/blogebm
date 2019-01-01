import {getById, remove} from "./toolbox.js";

/**
 * Creates a new textarea DOM element
 * @param {{isNew: boolean, id: int}} params
 * @returns {Element}
 */
export const createNewTextareaField = (params) => {
    // Textarea subnode
    const textareaSubnode = createNewTextareaSubNode(params);

    // Close button subnode
    const closeButton = createTextareaCloseButton();
    const closeButtonSubnode = createTextareaCloseButtonSubNode(closeButton);

    // Main node
    const newField = document.createElement("div");
    newField.classList.add("field", "has-addons", "paragraph-field");
    newField.id = `paragraph-field-${params.id}`;
    newField.appendChild(textareaSubnode);
    newField.appendChild(closeButtonSubnode);

    // Add listener to close paragraph button
    closeButton.addEventListener('click', () => remove(getById(`paragraph-field-${params.id}`)));

    // Add listeners related to close button visibility
    newField.addEventListener('mouseenter', () => closeButtonSubnode.style.display = null);
    newField.addEventListener('mouseleave', () => closeButtonSubnode.style.display = 'none');

    return newField;
};

const createNewTextareaSubNode = (params) => {
    const newTextarea = document.createElement("textarea");
    newTextarea.classList.add("textarea", "paragraph");
    newTextarea.placeholder = "...";
    newTextarea.dataset.type = params.isNew ? "new" : "old";
    newTextarea.dataset.id = params.id;

    const textareaControl = document.createElement("div");
    textareaControl.classList.add("control", "is-expanded");
    textareaControl.appendChild(newTextarea);

    return textareaControl;
};

const createTextareaCloseButton = () => {
    const textareaCloseButton = document.createElement("a");
    textareaCloseButton.classList.add("delete", "close-paragraph-button");
    return textareaCloseButton;
};

const createTextareaCloseButtonSubNode = (closeButton) => {
    const textareaCloseButtonControl = document.createElement("div");
    textareaCloseButtonControl.classList.add("control");
    textareaCloseButtonControl.style.display = 'none'; // Hide the button by default
    textareaCloseButtonControl.appendChild(closeButton);
    return textareaCloseButtonControl;
};

export const createNewParagraphField = (id) => {
    // Create paragraph node
    const newParagraph = document.createElement("p");
    newParagraph.classList.add("paragraph",  "lecture-mode-paragraph");
    newParagraph.dataset.type = "old";
    newParagraph.dataset.id = id;

    // Create main node
    const newField = document.createElement("div");
    newField.classList.add("field", "has-addons", "paragraph-field");
    newField.id = `paragraph-field-${id}`;
    newField.appendChild(newParagraph);

    return newField;
};