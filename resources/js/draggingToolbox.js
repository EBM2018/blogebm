import {getByClass, getById, ready, remove} from "./toolbox.js";

const dragstartHandler = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    addDropZones();
};

const dragendHandler = (event) => {
    removeDropzones();
};

const dragoverHandler = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"
};

const dropHandler = (event) => {
    event.preventDefault();
    const draggableZone = getById('draggable-zone');
    const data = event.dataTransfer.getData("text/plain");
    draggableZone.replaceChild(getById(data), event.target);
};

const addDropZones = () => {
    const draggableZone = getById('draggable-zone');
    let i = 0;
    for (const childNode of getByClass('draggable')) {
        const newDropZone = createDropZone();
        newDropZone.id = `dropzone-${i}`;
        draggableZone.insertBefore(newDropZone, childNode);
        i++;
    }
    const lastDropZone = createDropZone();
    lastDropZone.id = `dropzone-${i}`;
    draggableZone.appendChild(lastDropZone);
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

const onReady = () => {
    for (const draggableItem of getByClass('draggable')) {
        draggableItem.addEventListener('dragstart', (event) => dragstartHandler(event));
        draggableItem.addEventListener('dragend', (event) => dragendHandler(event));
    }
};

ready(onReady);