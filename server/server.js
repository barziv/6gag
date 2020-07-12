const PostManager = require('./posts/postsManager');
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 4000

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/posts', (req, res) => res.send(PostManager.getAllPosts()))

app.get('/posts/:id', (req, res) => res.send(PostManager.getSpecificPost(req.params.id)))

app.post('/posts', (req, res) => {
    PostManager.uploadNewPost(req.body);
    res.send('new post set')
})

app.listen(port, () => console.log(`instabar app listening at http://localhost:${port}`))