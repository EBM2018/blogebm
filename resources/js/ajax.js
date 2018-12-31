/**
 * The most used ones I guess.
 * @type {{GET: string, POST: string, PATCH: string, PUT: string, DELETE: string}}
 */
export const HTTPVerbs = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

/**
 * Checks if a given string matches the classic HTTP verbs
 * @param {string} method
 * @returns {boolean}
 */
const isMethodInEnum = (method) => {
    for (const methodFromEnum in HTTPVerbs) {
        if (method === HTTPVerbs[methodFromEnum]) return true;
    }
    return false;
};

/**
 * A boiler-plate AJAX requester
 * Adapted from http://youmightnotneedjquery.com/
 * @param {string} method An HTTP verb
 * @param {string} url The URL at which the request will be sent
 * @param {Object} data The payload of the request
 * @param {function} successCallback The function to callback in case of success
 * @param {function} errorCallback The function to call in case of failure
 */
export const makeAjaxRequest = (method, url, data, successCallback, errorCallback) => {
    if (isMethodInEnum(method) && typeof(url) === 'string') {
        const request = new XMLHttpRequest();
        request.open(method, url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                if (typeof(successCallback) === 'function') successCallback(request.response);
            } else {
                if (typeof(errorCallback) === 'function') errorCallback(request.response);
            }
        };

        request.onerror = () => {
            if (typeof(errorCallback) === 'function') errorCallback(request.response);
        };

        request.send(data);
    }
};