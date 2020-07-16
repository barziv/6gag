const config = require('./config');
const PostsManager = require('./posts/postsManager');
const PostsValidation = require('./validation/postsValidation');
const MongoManager = require('./DbManager/mongoDbManager');
const express = require('express')
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require('cors');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./validation/userAuthenticator');
const UsersManager = require('./validation/usersManager');

const upload = multer();
const app = express()
const postsManager = new PostsManager(new PostsValidation(), new MongoManager(config.MONGODB_URL), "/../pictures/");

initializePassport(
    passport,
    UsersManager.getUserById
)

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.json({limit: '50mb'})); 
app.use(flash())
app.use(session({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

function checkNotAuthenticated(req, res, next) {
    (req.isAuthenticated()) ? res.send(false) : next();
}

app.get('/isLogin', (req, res) => {
    res.send({res: req.isAuthenticated()});
})

app.post('/login', checkNotAuthenticated, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      res.set('Access-Control-Allow-Credentials', true);
      res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
      if (err) { return next(err); }
      if (!user) { return res.send({return:'wrong'}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({return:'good'});
      });
    })(req, res, next);
});

app.post('/register', (req, res) => {
    res.send(UsersManager.registerNewUser(req.body.username, req.body.password));
})

app.all('*', (req, res, next) => {
    (req.isAuthenticated()) ? next() : res.send([]);
})

app.delete('/logout', (req, res) => {
    req.logOut();
    res.send(true);
})

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

app.listen(config.PORT, () => console.log(`instabar app listening at http://localhost:${config.PORT}`))