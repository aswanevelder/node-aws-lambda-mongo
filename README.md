# node-aws-lambda-mongo
NodeJS function that applies the recommended MongoDB use with Lambda

## MongoDB Best Practice
This code is based on the [best practice](https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/) from MongoDB in using a AWS Lambda function to connect to MongoDB.

## Environment Variables

**MONGO_DBURL**: Uri to your MongoDB instance (mongodb://...) \
**MONGO_DBNAME**: Your DB name

## Example

```
const lambdamongo = require('aws-lambda-mongo');

function dowork(db, event) {
    db.collection('mycollection').insertOne({"name":"name1"})
    .then(async (data) => {
        return { statusCode: 200, data: data };
    })
    .catch(async (err) => {
        return { statusCode: 500, data: err };
    });
}

exports.handler = (event, context, callback) => {
    lambdamongo.dowork(event, context, dowork, callback);
}

```
