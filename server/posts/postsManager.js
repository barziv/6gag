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

    getTopTenPosts() {
        return this.dbManager.getTop(10, {likes: -1});
    }

    getSpecificPost(id, filter=NaN) {
        return this.dbManager.getByID(id, filter);
    }

    uploadNewPost(postInformation, picture) {
        if (this.postsValidation.isPostValid(postInformation, picture)) {
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
    
    changePost(requestBody) {
        let fieldToUpdate = this.postsValidation.isUpdateRequestValid(requestBody);
        this.dbManager.getByID(requestBody.id)
        .then(post => {
            if (this.postsValidation.canUpdate(post, fieldToUpdate)) {
                let query = this._createQuery(post, requestBody, fieldToUpdate);
                this.dbManager.update(requestBody.id, query);
                return true;
            }

            return false; 
        });
        
    }

    _createQuery(post, requestBody, fieldToUpdate) {
        let data = {}, query = {};
        data[fieldToUpdate.key] = (requestBody.hasOwnProperty("isLike")) ? 
                    this._getNewAmountOfLikes(post, requestBody.isLike)
                    : requestBody[fieldToUpdate.field];
        query[fieldToUpdate.command] = data;
        return query;
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