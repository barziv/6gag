class MongoDbManager {
    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        this.url = "mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb";
    }

    getByID(id, filter=NaN) {
        return new Promise((resolve, reject) => { 
            this.MongoClient.connect(this.url).then(function(db){
                var dbo = db.db("InstaBar");
                dbo.collection("posts").find({id: id}, 
                { projection: filter }).toArray(function(err, res) {
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
        this.MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("InstaBar");
            dbo.collection("posts").insertOne(data, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    }

    update(id, data) {
        this.MongoClient.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("InstaBar");
            var myquery = { id: id };
            var newvalues = { $set: data };
            dbo.collection("posts").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
          });
    }
}

module.exports = MongoDbManager;