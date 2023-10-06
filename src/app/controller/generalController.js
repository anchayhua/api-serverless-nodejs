const uuid = require('node-uuid')

const { GENERAL_TABLE } = process.env

const dynamoDb = require('../../config/database')

module.exports = {

    get: (params) => {
        return new Promise(async (resolve, reject) => {

            const dynamotable = {
                TableName: GENERAL_TABLE,
                KeyConditionExpression: '#id = :id',
                ExpressionAttributeValues: {
                    ':id': { S: '1' },
                }
            }

            const result = await dynamoDb.query(params)

            if (!result.Items) {
                reject(new Error('Error al recuperar los datos'))
            } else {
                const todo = result.Items[0]

                resolve(res.json({ todo }))
            }
        })
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {

            const { generalId } = id;

            const dynamotable = {
                TableName: GENERAL_TABLE,
                Key: {
                    generalId,
                },
            }

            dynamoDb.get(dynamotable, (error, result) => {
                if (error) {
                    console.error(error);
                    reject(new Error('Error al recuperar la data'))
                } else

                    if (result ? result.Item : false) {
                        const { generalId, title, done } = result.Item
                        resolve({ generalId, title, done })
                    } else {
                        reject(new Error(`Data con el: ${generalId} no encontrado`))
                    }
            })
        })
    },

    post: (params) => {
        return new Promise((resolve, reject) => {

            const { title, done = false } = params;

            const generalId = uuid.v4()

            const dynamotable = {
                TableName: GENERAL_TABLE,
                Item: {
                    generalId,
                    title,
                    done,
                },
            }

            dynamoDb.put(dynamotable, error => {
                if (error) {
                    console.error(error);
                    reject(new Error('Error al registrar los datos'))
                } else {
                    resolve({ generalId, title, done })
                }
            })
        })
    },

    put: (params) => {
        return new Promise((resolve, reject) => {

            const { generalId, title, done } = params

            var dynamotable = {
                TableName: GENERAL_TABLE,
                Key: { generalId },
                UpdateExpression: 'set #a = :title, #b = :done',
                ExpressionAttributeNames: { '#a': 'title', '#b': 'done' },
                ExpressionAttributeValues: { ':title': title, ':done': done },
            }

            dynamoDb.update(dynamotable, error => {
                if (error) {
                    console.error(error);
                    reject(new Error('Error al actualizar los datos'))
                } else {
                    resolve({ generalId, title, done })
                }
            })
        })
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {

            const { generalId } = id

            const dynamotable = {
                TableName: GENERAL_TABLE,
                Key: {
                    generalId,
                },
            }

            dynamoDb.delete(dynamotable, error => {
                if (error) {
                    console.error(error);
                    reject(new Error('Error al eliminar la data'))
                } else {
                    resolve({ success: true })
                }
            })
        })
    }
}
