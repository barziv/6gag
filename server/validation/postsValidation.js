class PostsValidation {
    constructor() {}

    newPostValidation(inputFromClient, pictureFromClient) {
        return ("ownerID" in inputFromClient && inputFromClient.ownerID !== "") &&
            pictureFromClient !== undefined;
    }

    isExitsAndHasLikes(posts, id) {
        if (this._canChangeLikes(posts, id)) {
            let post = posts.get(id);
            
            if (!("likes" in post)) {
                post["likes"] = 0;
            }

            return true;
        }

        return false;
    }

    _canChangeLikes(posts, id) {
        return posts.get(id) !== undefined;
    }
}

module.exports = PostsValidation;