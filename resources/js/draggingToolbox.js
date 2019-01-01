import {getByClass, getById, remove} from "./toolbox.js";

/**
 * Handles the start of a drag
 * @param {Event} event
 * @param {string} draggableClassName
 * @param {Element} parentNode
 * @param {function} dropCallback The function to callback after dropping
 */
export const dragstartHandler = (event, draggableClassName, parentNode, dropCallback) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    addDropZones(draggableClassName, parentNode, dropCallback);
};

/**
 * Handles the end of a drag
 */
export const dragendHandler = () => {
    removeDropzones();
};

/**
 * Handles the drag motion
 * @param {Event} event
 */
const dragoverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
};

/**
 * Handles a drop
 * @param {Event} event
 * @param {Element} parentNode
 * @param {function} dropCallback The function to callback after dropping
 */
const dropHandler = (event, parentNode, dropCallback) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    parentNode.replaceChild(getById(data), event.target);
    dropCallback();
};

/**
 * Adds drop zones for dragged element
 * @param {string} draggableClassName
 * @param {Element} parentNode
 * @param {function} dropCallback The function to callback after dropping
 */
const addDropZones = (draggableClassName, parentNode, dropCallback) => {
    let i = 0;
    for (const childNode of parentNode.getElementsByClassName(draggableClassName)) {
        const newDropZone = createDropZone(parentNode, dropCallback);
        newDropZone.id = `dropzone-${i}`;
        parentNode.insertBefore(newDropZone, childNode);
        i++;
    }
    const lastDropZone = createDropZone(parentNode, dropCallback);
    lastDropZone.id = `dropzone-${i}`;
    parentNode.appendChild(lastDropZone);
};

/**
 * Removes dropzones
 */
const removeDropzones = () => {
    const dropzones = getByClass('dropzone');
    remove(dropzones);
};

/**
 * Creates a dropzone
 * @param {Element} parentNode
 * @param {function} dropCallback The function to callback after dropping
 * @returns {Element} A new dropzone
 */
const createDropZone = (parentNode, dropCallback) => {
    const dropZone = document.createElement('div');
    dropZone.classList.add('dropzone');
    dropZone.innerHTML = '---';
    dropZone.addEventListener('drop', (event) => dropHandler(event, parentNode, dropCallback));
    dropZone.addEventListener('dragover', (event) => dragoverHandler(event));
    return dropZone;
};