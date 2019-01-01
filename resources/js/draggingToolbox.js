import {getByClass, getById, remove} from "./toolbox.js";

/**
 * Handles the start of a drag
 * @param {Event} event
 * @param {string} draggableClassName
 * @param {Element} parentNode
 */
export const dragstartHandler = (event, draggableClassName, parentNode) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    addDropZones(draggableClassName, parentNode);
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
 */
const dropHandler = (event, parentNode) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    parentNode.replaceChild(getById(data), event.target);
};

/**
 * Adds drop zones for dragged element
 * @param {string} draggableClassName
 * @param {Element} parentNode
 */
const addDropZones = (draggableClassName, parentNode) => {
    let i = 0;
    for (const childNode of parentNode.getElementsByClassName(draggableClassName)) {
        const newDropZone = createDropZone(parentNode);
        newDropZone.id = `dropzone-${i}`;
        parentNode.insertBefore(newDropZone, childNode);
        i++;
    }
    const lastDropZone = createDropZone(parentNode);
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
 * @returns {Element}
 */
const createDropZone = (parentNode) => {
    const dropZone = document.createElement('div');
    dropZone.classList.add('dropzone');
    dropZone.innerHTML = '---';
    dropZone.addEventListener('drop', (event) => dropHandler(event, parentNode));
    dropZone.addEventListener('dragover', (event) => dragoverHandler(event));
    return dropZone;
};