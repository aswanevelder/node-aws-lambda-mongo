let environment = require('./config/environment');
const MongoClient = require('mongodb').MongoClient;

let cachedDb = null;

function connectToDatabase(uri) {
    console.log('=> connect to database');

    if (cachedDb) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }

    return MongoClient.connect(uri)
        .then(client => {
            const db = client.db(environment.MONGO_DBNAME);
            cachedDb = db;
            return cachedDb;
        });
}

exports.dowork = (event, context, func, callback) => {
    if (func) {
        // context.callbackWaitsForEmptyEventLoop = false;
        console.log('event: ', event);

        connectToDatabase(environment.MONGO_DBURL)
            .then(db => func(db, event))
            .then(result => {
                console.log('=> returning result: ', result);
                callback(null, result);
            })
            .catch(err => {
                console.log('=> an error occurred: ', err);
                callback(err);
            });
    }
    else
        console.log('Specify a work function with signare dowork(db, event)');
};

