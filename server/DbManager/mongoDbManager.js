const mongo = require('mongodb');
const config = require('../config');

class MongoDbManager {
    constructor(url) {
        this.MongoClient = mongo.MongoClient;
        this.url = url;
    }

    getByID(id, filter=NaN) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                let dbo = db.db(config.DB_NAME);
                dbo.collection(config.COLLECTION_NAME).findOne({_id: new mongo.ObjectId(id)}, function(err, res) {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db(config.DB_NAME);
                dbo.collection(config.COLLECTION_NAME).find({}).toArray(function(err, res) {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    getTop(amount, sortOption=NaN) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db(config.DB_NAME);
                dbo.collection(config.COLLECTION_NAME).find({}).sort(sortOption).limit(amount)
                .toArray(function(err, res) {
                    resolve(res);
                    db.close();
                });
            });
        });
    }

    insert(data) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db(config.DB_NAME);
                dbo.collection(config.COLLECTION_NAME).insertOne(data, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    resolve(res.ops[0]["_id"]);
                    db.close();
                });
            });
        });
    }

    update(id, query) {
        this.MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(config.DB_NAME);
            var myquery = { _id: new mongo.ObjectId(id) };
            dbo.collection(config.COLLECTION_NAME).updateOne(myquery, query, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          });
    }

    delete(id) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db(config.DB_NAME);
                dbo.collection(config.COLLECTION_NAME).deleteOne({_id: new mongo.ObjectId(id)}, function(err, res) {
                    console.log("1 document deleted");
                    (res.result.n === 1) ? resolve(true) : resolve(false);
                    db.close();
                });
            });
        });
    }
}

module.exports = MongoDbManager;