/**
 * Waits for the DOM to be loaded before executing code
 * From http://youmightnotneedjquery.com/
 * @param {function} fn
 */
export const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', fn);
    else {
        document.attachEvent('onreadystatechange', () => {
            if (document.readyState !== 'loading')
                fn();
        });
    }
};

/**
 * Removes elements from the DOM
 * From http://youmightnotneedjquery.com/
 * @param {Array} elementsList
 */
export const remove = (elementsList) => {
    if (NodeList.prototype.isPrototypeOf(elementsList) || HTMLCollection.prototype.isPrototypeOf(elementsList)) {
        Array.from(elementsList).forEach((item) => item.parentNode.removeChild(item));
    } else elementsList.parentNode.removeChild(elementsList);
};

/**
 * Returns the DOM element with the corresponding id
 * @param {string} id
 * @returns {HTMLElement}
 */
export const getById = (id) => {
    return document.getElementById(id);
};

/**
 * Returns a list of DOM elements with the corresponding class
 * @param {string} classname
 * @returns {HTMLCollectionOf<Element>}
 */
export const getByClass = (classname) => {
    return document.getElementsByClassName(classname);
};

/**
 * Returns the first DOM element matching a given css selector
 * @param {string} selector
 * @returns {Element}
 */
export const getBySelector = (selector) => {
    return document.querySelector(selector);
};

/**
 * Returns a list of DOM elements matching a given css selector
 * @param selector
 * @returns {NodeListOf<Element>}
 */
export const getAllBySelector = (selector) => {
    return document.querySelectorAll(selector);
};