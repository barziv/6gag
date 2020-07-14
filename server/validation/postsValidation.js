class PostsValidation {
    constructor() {}

    newPostValidation(inputFromClient, pictureFromClient) {
        return ("ownerID" in inputFromClient && inputFromClient.ownerID !== "") &&
            pictureFromClient !== undefined;
    }

    isExits(posts) {
        return posts.length === 1;
        // if (this._canChangeLikes(posts)) {
        //     let post = posts[0];
        //     if (!("likes" in post)) {
        //         updataFunction(post.id, {likes: 0});
        //     }

        //     return true;
        // }

        // return false;
    }

    _canChangeLikes(posts) {
        return posts.length === 1;
    }
}

module.exports = PostsValidation;