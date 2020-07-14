var config = {};

config.DB_NAME = "InstaBar";
config.COLLECTION_NAME = "posts";
config.MONGODB_URL = "mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb";
config.FIELDS_TO_INIT = ["likes"];

module.exports = config;