const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const {
    DynamoDBDocument } = require("@aws-sdk/lib-dynamodb"),
    {
        DynamoDB
    } = require("@aws-sdk/client-dynamodb");
const uuid = require('node-uuid')
const axios = require('axios');

const { TODOS_TABLE, IS_OFFLINE } = process.env

const dynamoDb =
    IS_OFFLINE === 'true'
        ? DynamoDBDocument.from(new DynamoDB({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        }))
        : DynamoDBDocument.from(new DynamoDB())

app.use(bodyParser.json({ strict: false }))

// Endpoint /general

app.get('/', (req, res) => {
    res.send('¡Hola desde la ruta raíz!');
});

app.get('/general', async (req, res) => {
    const params = {
        TableName: TODOS_TABLE,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeValues: {
            ':id': { S: '1' },
        },
    }

    const result = await dynamoDb.query(params)

    if (!result.Items) {
        return res.status(404).json({ error: 'Todo not found' })
    }

    const todo = result.Items[0]

    return res.json({ todo })
})

// Endpoint /general

app.post('/general', async (req, res) => {
    const { title, done = false } = req.body

    const todoId = uuid.v4()

    const params = {
        TableName: TODOS_TABLE,
        Item: {
            todoId,
            title,
            done,
        },
    }

    await dynamoDb.put(params)

    return res.json({ todoId, title, done })
})

// Endpoint /general/:todoId

app.get('/general/:todoId', async (req, res) => {
    const todoId = req.params.todoId

    const params = {
        TableName: TODOS_TABLE,
        Key: {
            todoId,
        },
    }

    const result = await dynamoDb.get(params)

    if (!result.Item) {
        return res.status(404).json({ error: `Todo with id: ${todoId} not found` })
    }

    const todo = result.Item

    return res.json({ todo })
})

// Endpoint /general/:todoId

app.put('/general/:todoId', async (req, res) => {
    const todoId = req.params.todoId

    const { title, done } = req.body

    const params = {
        TableName: TODOS_TABLE,
        Key: {
            todoId,
        },
        UpdateExpression: 'set #a = :title, #b = :done',
        ExpressionAttributeNames: { '#a': 'title', '#b': 'done' },
        ExpressionAttributeValues: { ':title': title, ':done': done },
    }

    await dynamoDb.update(params)

    return res.json({ todoId, title, done })
})

// Endpoint /general

app.delete('/general/:todoId', async (req, res) => {
    const todoId = req.params.todoId

    const params = {
        TableName: TODOS_TABLE,
        Key: {
            todoId,
        },
    }

    await dynamoDb.delete(params)

    return res.json({ success: true })
})

// Endpoint /starwars

app.get('/starwars', async (req, res) => {
    const url = 'https://swapi.py4e.com/api/people/1/?format=json'

    try {
        const response = await axios.get(url)

        return res.json(response.data)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

if (!process.env.IS_OFFLINE && !process.env.JEST_WORKER_ID) {
    const server = app.listen(3000, () => {
        console.log('Servidor Express escuchando en el puerto 3000');
    });
}

// module.exports.handler = serverless(app)
module.exports = app;