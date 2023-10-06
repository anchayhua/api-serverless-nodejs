const {
    DynamoDBDocument } = require("@aws-sdk/lib-dynamodb"),
    {
        DynamoDB
    } = require("@aws-sdk/client-dynamodb");

const { IS_OFFLINE } = process.env

const dynamoDb =
    IS_OFFLINE === 'true'
        ? DynamoDBDocument.from(new DynamoDB({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        }))
        : DynamoDBDocument.from(new DynamoDB())

module.exports = dynamoDb;