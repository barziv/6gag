const config = require('./config');
const PostsManager = require('./posts/postsManager');
const PostsValidation = require('./validation/postsValidation');
const MongoManager = require('./DbManager/mongoDbManager');
const express = require('express')
const bodyParser = require("body-parser");
const multer = require('multer');
const upload = multer();
var cors = require('cors');
const app = express()
const port = 4000
const postsManager = new PostsManager(new PostsValidation(), new MongoManager(config.MONGODB_URL), "/../pictures/");

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({limit: '50mb'})); 

app.use("/pictures", express.static(__dirname+"/pictures"));

app.get('/posts', (req, res) => {
    postsManager.getAllPosts().then(dbData => res.send(dbData));
})

app.get('/posts/top-ten', (req, res) => {
    postsManager.getTopTenPosts().then(dbData => res.send(dbData));
})

app.get('/posts/:id', (req, res) => {
    postsManager.getSpecificPost(req.params.id).then(dbData => {
        res.send(dbData);
    });
})

app.post('/posts', upload.single('picture'), (req, res) => {
    if (postsManager.uploadNewPost(req.body, req.file)) {
        res.send('new post set');
    }
    else {
        res.send('bad request');   
    }
})

app.put('/posts', async (req, res) => {
    if (await postsManager.changePost(req.body)) {
        res.send('new post set');
    }
    else {
        res.send('bad request');   
    }
})

app.delete('/posts/:id', async (req, res) => {
    res.send(await postsManager.deletePost(req.params.id));
})

app.listen(port, () => console.log(`instabar app listening at http://localhost:${port}`))