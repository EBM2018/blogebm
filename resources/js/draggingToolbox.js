import {getByClass, getById, remove} from "./toolbox.js";

export const dragstartHandler = (event, draggableClassName, parentNode) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    addDropZones(draggableClassName, parentNode);
};

export const dragendHandler = (event) => {
    removeDropzones();
};

const dragoverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
};

const dropHandler = (event, parentNode) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    parentNode.replaceChild(getById(data), event.target);
};

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

const removeDropzones = () => {
    const dropzones = getByClass('dropzone');
    remove(dropzones);
};

const createDropZone = (parentNode) => {
    const dropZone = document.createElement('div');
    dropZone.classList.add('dropzone');
    dropZone.innerHTML = '---';
    dropZone.addEventListener('drop', (event) => dropHandler(event, parentNode));
    dropZone.addEventListener('dragover', (event) => dragoverHandler(event));
    return dropZone;
};