const mongo = require('mongodb');

class MongoDbManager {
    constructor() {
        this.MongoClient = mongo.MongoClient;
        this.url = "mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb";
    }

    getByID(id, filter=NaN) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                let dbo = db.db("InstaBar");
                dbo.collection("posts").findOne({_id: new mongo.ObjectId(id)}, function(err, res) {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db("InstaBar");
                dbo.collection("posts").find({}).toArray(function(err, res) {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    insert(data) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db("InstaBar");
                dbo.collection("posts").insertOne(data, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    resolve(res.ops[0]["_id"]);
                    db.close();
                });
            });
        });
    }

    update(id, data) {
        this.MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("InstaBar");
            var myquery = { _id: new mongo.ObjectId(id) };
            var newvalues = { $set: data };
            dbo.collection("posts").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          });
    }

    delete(id) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db("InstaBar");
                dbo.collection("posts").deleteOne({_id: new mongo.ObjectId(id)}, function(err, res) {
                    console.log("1 document deleted");
                    (res.result.n === 1) ? resolve(true) : resolve(false);
                    db.close();
                });
            });
        });
    }
}

module.exports = MongoDbManager;