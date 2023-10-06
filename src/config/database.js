const AWS = require('aws-sdk')

const { IS_OFFLINE } = process.env

const dynamoDb =
    IS_OFFLINE === 'true'
        ? new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        })
        : new AWS.DynamoDB.DocumentClient()

module.exports = dynamoDb;