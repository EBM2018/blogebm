import {ready, getById} from "./toolbox.js";

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
    contentField.innerHTML += `<textarea class="textarea" id="paragraph-${newParagraphID}" placeholder="..."></textarea>`;
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



