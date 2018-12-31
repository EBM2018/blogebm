import {getByClass, getById, ready} from "./toolbox.js";
import {createNewParagraphField, createNewTextareaField} from "./paragraphsFormatter.js";
import {addNewParagraphToContentField} from "./paragraphsCreator.js";

const contentField = getById('content-field');
const addParagraphButton = getById('add-paragraph-button');

const onReady = () => {
    const paragraphs = getByClass('lecture-mode-paragraph');
    for (const paragraph of paragraphs)
        paragraph.addEventListener('click', () => replaceParagraphWithTextarea(paragraph));
    addParagraphButton.addEventListener('click', () => {
        const newTextarea = addNewParagraphToContentField();
        newTextarea.addEventListener('keydown', (event) => onTextareaKeyup(event, newTextarea.dataset.id));
    });

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
    newTextarea.addEventListener('keydown', (event) => onTextareaKeyup(event, id));
};

const onTextareaKeyup = (event, id) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Don't add a new line when pressing Enter
        // Send request
        replaceTextareaWithParagraph(id);
    }
};

const replaceTextareaWithParagraph = (id) => {
    // Replace paragraph node
    const paragraphField = getById(`paragraph-field-${id}`);
    const paragraphTextarea = paragraphField.getElementsByClassName("paragraph")[0];
    const newParagraphField = createNewParagraphField(id);
    const newParagraph = newParagraphField.getElementsByClassName("paragraph")[0];
    newParagraph.innerHTML = paragraphTextarea.value;
    contentField.replaceChild(newParagraphField, paragraphField);

    // Add click listener
    newParagraph.addEventListener('click', () => replaceParagraphWithTextarea(newParagraph));
};

ready(onReady);