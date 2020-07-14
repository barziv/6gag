class PostsValidation {
    constructor() {}

    isPostValid(inputFromClient, pictureFromClient) {
        return ("ownerID" in inputFromClient && inputFromClient.ownerID !== "") &&
            pictureFromClient !== undefined;
    }

    isExits(post) {
        return post !== null;
    }
}

module.exports = PostsValidation;