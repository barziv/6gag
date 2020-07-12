const PostManager = require('./posts/postsManager');
const express = require('express')
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express()
const port = 4000

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    console.log("posts req");
    res.send(PostManager.getAllPosts())
})

app.get('/posts/:id', (req, res) => res.send(PostManager.getSpecificPost(req.params.id)))

app.post('/posts', (req, res) => {
    console.log(req.body);
    if (PostManager.uploadNewPost(req.body)) {
        res.send('new post set');
    }
    else {
        res.send('bad request');   
    }
})

app.listen(port, () => console.log(`instabar app listening at http://localhost:${port}`))