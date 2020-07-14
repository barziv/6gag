const config = require('../config');

class PostsValidation {
    constructor() {}

    isPostValid(inputFromClient, pictureFromClient) {
        return ("ownerID" in inputFromClient && inputFromClient.ownerID !== "") &&
            pictureFromClient !== undefined;
    }

    isUpdateRequestValid(requestBody) {
        if (requestBody.hasOwnProperty("id")) {
            return this._hasKeysForUpdate(requestBody, config.QUERYS);
        }

        return false;
    }

    canUpdate(post, fieldToUpdate) {
        return post !== null && fieldToUpdate !== false;
    }

    _hasKeysForUpdate(obj, wantedKey) {
        for (let key of Object.keys(obj)) {
            if (wantedKey[key] !== undefined) {
                return wantedKey[key];
            }
        }

        return false;
    }
}

module.exports = PostsValidation;