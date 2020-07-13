const PostManager = require('./posts/postsManager');
const express = require('express')
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();
var cors = require('cors');
const app = express()
const port = 4000

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({limit: '50mb'})); 

app.use("/pictures", express.static(__dirname+"/pictures"));

app.get('/posts', (req, res) => {
    console.log("posts req");
    res.send(PostManager.getAllPosts())
})

app.post('/posts', upload.single('picture'), (req, res) => {

    if (PostManager.uploadNewPost(req.body, req.file)) {
        res.send('new post set');
    }
    else {
        res.send('bad request');   
    }
})

app.listen(port, () => console.log(`instabar app listening at http://localhost:${port}`))