const fs = require('fs');
const config = require('../config');

class PostsManager {
    constructor(postsValidation, dbManager, picturesLocation) {
        this.dirPath = __dirname+picturesLocation;
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
        return this.dbManager.getByID(id, {likes: 1});
    }

    uploadNewPost(postInformation, picture) {
        if (this.postsValidation.isPostValid(postInformation, picture)) {
            config.FIELDS_TO_INIT.forEach(field => postInformation[field] = "");
            this.dbManager.insert(postInformation).then(id => {
                this._saveToFile(id, picture); 
            });
            
            return true;
        }

        return false;
    }

    async deletePost(id) {
        if (await this.dbManager.delete(id)) {
            fs.unlink(this.dirPath+id, () => { console.log("remove file"); })
            return true;
        }

        return false;
    }
    
    changeLikes(id, isLike) {
        this.dbManager.getByID(id, {likes: 1})
        .then(post => {
            if (this.postsValidation.isExits(post)) {
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