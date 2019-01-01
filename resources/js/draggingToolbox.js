import {getByClass, getById, ready, remove} from "./toolbox.js";

const contentField = getById('content-field');

export const dragstartHandler = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    addDropZones();
};

export const dragendHandler = (event) => {
    removeDropzones();
};

const dragoverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
};

const dropHandler = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    contentField.replaceChild(getById(data), event.target);
};

const addDropZones = () => {
    let i = 0;
    for (const childNode of contentField.getElementsByClassName('paragraph-field')) {
        const newDropZone = createDropZone();
        newDropZone.id = `dropzone-${i}`;
        contentField.insertBefore(newDropZone, childNode);
        i++;
    }
    const lastDropZone = createDropZone();
    lastDropZone.id = `dropzone-${i}`;
    contentField.appendChild(lastDropZone);
};

const removeDropzones = () => {
    const dropzones = getByClass('dropzone');
    remove(dropzones);
};

const createDropZone = () => {
    const dropZone = document.createElement('div');
    dropZone.classList.add('dropzone');
    dropZone.innerHTML = '---';
    dropZone.addEventListener('drop', (event) => dropHandler(event));
    dropZone.addEventListener('dragover', (event) => dragoverHandler(event));
    return dropZone;
};