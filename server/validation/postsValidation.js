class PostsValidation {
    constructor() {}

    newPostValidation(inputFromClient, pictureFromClient) {
        return ("ownerID" in inputFromClient && inputFromClient.ownerID !== "") &&
            pictureFromClient !== undefined;
    }

    isExits(post) {
        return post !== null;
    }

    _canChangeLikes(posts) {
        return posts.length === 1;
    }
}

module.exports = PostsValidation;