const PostsValidation = require('../validation/postsValidation');
const uuid = require('uuid');
const fs = require('fs');

class PostsManager {
    constructor(postsValidation, dbManager) {
        this.posts = new Map();
        this.dirPath = __dirname+"/../pictures/";
        this.postsValidation = postsValidation;
        this.dbManager = dbManager;

        if (!fs.existsSync(this.dirPath)){
            fs.mkdirSync(this.dirPath);
        }
    }

    getAllPosts() {
        return Array.from(this.posts.values());
    }

    getSpecificPost(id) {
        return this.posts.get(id);
    }

    uploadNewPost(postInformation, picture) {
        if (this.postsValidation.newPostValidation(postInformation, picture)) {
            let id = uuid.v4();
            postInformation["id"] = id;
            this.dbManager.insert(postInformation);
            this.posts.set(id, postInformation);
            this._saveToFile(id, picture);
            return true;
        }

        return false;
    }

    deletePost(id) {
        if (this.posts.delete(id))
        {
            fs.unlink(this.dirPath+id, () => {
                console.log("remove file");
            })
            return true;
        }

        return false;
    }
    
    changeLikes(id, isLike) {
        if (this.postsValidation.isExitsAndHasLikes(this.posts, id)) {
            let post = this.posts.get(id);
            this._changeLikesAmount(post, isLike);
            return true;
        }
        
        return false;
    }

    _changeLikesAmount(post, isLike) {
        if (isLike === true) {
            post["likes"]++;
        }
        else if (post["likes"] > 0) {
            post["likes"]--;
        }
    }

    _saveToFile(filename, file) {
        let filePath = this.dirPath+filename;
        fs.appendFile(filePath, file.buffer, () => {
            console.log("write to file");
        });
    }

}

module.exports = PostsManager;