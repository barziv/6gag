var config = {};

config.DB_NAME = "InstaBar";
config.COLLECTION_NAME = "posts";
config.MONGODB_URL = "mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb";
config.QUERYS = {
    isLike: { command: "$set", field: "isLike", key: "likes" },
    comment: { command: "$push", field: "comment", key: "comments" }
};

module.exports = config;