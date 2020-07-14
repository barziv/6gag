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

    async getAllPosts() {
        return this.dbManager.getAll();
    }

    getSpecificPost(id) {
        return this.posts.get(id);
    }

    uploadNewPost(postInformation, picture) {
        let moreFields = ["likes"];
        if (this.postsValidation.newPostValidation(postInformation, picture)) {
            let id = uuid.v4();
            postInformation["id"] = id;
            moreFields.forEach(field => postInformation[field] = "");
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
        this.dbManager.getByID(id, {likes: 1})
        .then(posts => {
            if (this.postsValidation.isExits(posts)) {
                let post = posts[0];
                let likes = this._getNewAmountOfLikes(post, isLike);
                this.dbManager.update(id, {"likes": likes});
                return true;
            }

            return false; 
        });
        
    }

    _getNewAmountOfLikes(post, isLike) {
        let likes = post.likes;
        if (!("likes" in post)) {
            likes = 0;
        }

        if (isLike) {
            likes++;
        }
        else if (likes > 0) {
            likes--;
        }

        return likes;
    }

    _saveToFile(filename, file) {
        let filePath = this.dirPath+filename;
        fs.appendFile(filePath, file.buffer, () => {
            console.log("write to file");
        });
    }

}

module.exports = PostsManager;