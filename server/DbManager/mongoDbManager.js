const mongo = require('mongodb');
const config = require('../config');

class MongoDbManager {
    constructor(url) {
        this.MongoClient = mongo.MongoClient;
        this.url = url;
    }

    getByID(id, filter=NaN) {
        return new Promise((resolver, reject) => { 
            this._getMongoCollection().then((collection) => {
                collection.findOne({_id: new mongo.ObjectId(id)}, function(err, res) {
                    resolver(res);
                });
            });
        });
    }

    getAll() {
        return new Promise((resolver, reject) => { 
            this._getMongoCollection().then((collection) => {
                collection.find({}).toArray(function(err, res) {
                    resolver(res);
                });
            });
        });
    }

    getTop(amount, sortOption=NaN) {
        return new Promise((resolver, reject) => { 
            this._getMongoCollection().then((collection) => {
                collection.find({}).sort(sortOption).limit(amount).toArray(function(err, res) {
                    resolver(res);
                });
            });
        });
    }

    insert(data) {
        return new Promise((resolver, reject) => { 
            this._getMongoCollection().then((collection) => {
                collection.insertOne(data, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    resolver(res.ops[0]["_id"]);
                });
            });
        });
    }

    update(id, query) {
        this._getMongoCollection().then((collection) => {
            var myquery = { _id: new mongo.ObjectId(id) };
            collection.updateOne(myquery, query, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
            });
        });
    }

    delete(id) {
        return new Promise((resolver, reject) => { 
            this._getMongoCollection().then((collection) => {
                collection.deleteOne({_id: new mongo.ObjectId(id)}, function(err, res) {
                    console.log("1 document deleted");
                    (res.result.n === 1) ? resolver(true) : resolver(false);
                });
            });
        });
    }

    _getMongoCollection() {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                let dbo = db.db(config.DB_NAME);
                resolve(dbo.collection(config.COLLECTION_NAME), db);
            });
        });
    }
}

module.exports = MongoDbManager;