import {getByClass, getById, ready} from "./toolbox.js";
import {createNewTextareaField} from "./paragraphsToolbox.js";

const contentField = getById('content-field');

const onReady = () => {
    const paragraphs = getByClass('lecture-mode-paragraph');
    for (const paragraph of paragraphs) {
        paragraph.addEventListener('click', () => replaceParagraphWithTextarea(paragraph));
    }
};

const replaceParagraphWithTextarea = (paragraphNode) => {
    const id = parseInt(paragraphNode.dataset.id);
    const content = paragraphNode.innerHTML;
    const paragraphField = getById(`paragraph-field-${id}`);
    const newParagraphField = createNewTextareaField({isNew: false, id: id});
    const newTextarea = newParagraphField.getElementsByClassName("paragraph")[0];
    newTextarea.value = content;
    contentField.replaceChild(newParagraphField, paragraphField);
};

ready(onReady);