const uuid = require('uuid');

class PostsManager {
    constructor() {
        this.posts = new Map();
    }

    getAllPosts() {
        return Array.from(this.posts.values());
    }

    getSpecificPost(id) {
        return this.posts.get(id);
    }

    uploadNewPost(postInformation) {
        if ("ownerID" in postInformation && postInformation.ownerID !== "") {
            let id = uuid.v4();
            postInformation["id"] = id;
            this.posts.set(id, postInformation);
            return true;
        }

        return false;
    }

}

module.exports = new PostsManager();