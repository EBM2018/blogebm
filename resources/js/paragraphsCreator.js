import {getById, getByClass} from "./toolbox.js";
import {createNewTextareaField} from "./paragraphsFormatter.js";

const contentField = getById('content-field');
const newParagraphInitialInput = getById('new-paragraph-initial-input');

/**
 * Adds a new textarea-type paragraph to content field
 * @return {Element} The textarea element contained in the created node tree
 */
export const addNewParagraphToContentField = () => {
    // Get a unique new paragraph id
    const paragraphsIDs = collectParagraphsIDs();
    const newParagraphID = Math.max(...paragraphsIDs, 0) + 1;
    paragraphsIDs.push(newParagraphID);

    // Add the new paragraph field
    const newParagraphField = createNewTextareaField({isNew: true, id: newParagraphID});
    contentField.appendChild(newParagraphField);
    const newTextarea = newParagraphField.getElementsByClassName("paragraph")[0];

    // Setup its default value
    newTextarea.value = newParagraphInitialInput.value != null && newParagraphInitialInput.value.length > 0 ?
        newParagraphInitialInput.value : "Nouveau paragraphe";

    // Clear initial input after use
    newParagraphInitialInput.value = "";

    // Steal focus
    newTextarea.focus();

    return newTextarea;
};

/**
 * Collects the article paragraphs IDs
 * @returns {Array}
 */
const collectParagraphsIDs = () => {
    const paragraphsIDs = [];
    for (const paragraph of getByClass('paragraph')) paragraphsIDs.push(paragraph.dataset.id)
    return paragraphsIDs;
};



