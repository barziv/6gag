const uuid = require('uuid');
const fs = require('fs');

class PostsManager {
    constructor() {
        this.posts = new Map();
        let dirPath = __dirname+"/../pictures";

        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
    }

    getAllPosts() {
        return Array.from(this.posts.values());
    }

    getSpecificPost(id) {
        return this.posts.get(id);
    }

    uploadNewPost(postInformation, picture) {
        if ("ownerID" in postInformation && postInformation.ownerID !== "") {
            let id = uuid.v4();
            postInformation["id"] = id;
            this.posts.set(id, postInformation);
            this._saveToFile(id, picture);
            return true;
        }

        return false;
    }

    deletePost(id) {
        return this.posts.delete(id);
    }
    
    changeLikes(id, isLike) {
        let post = this.posts.get(id);
        if (post !== undefined) {
            if (!("like" in post)) {
                post["like"] = 0;
            }

            this._incLikes(post, isLike);
            return true;
        }
        
        return false;
    }

    _incLikes(post, isLike) {
        if (isLike === true) {
            post["like"]++;
        }
        else if (post["like"] > 0) {
            post["like"]--;
        }
    }

    _saveToFile(filename, file) {
        let filePath = __dirname+"/../pictures/"+filename;
        fs.appendFile(filePath, file.buffer, () => {
            console.log("write to file");
        });
    }

}

module.exports = new PostsManager();