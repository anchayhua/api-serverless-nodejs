
const serverless = require('serverless-http')

const app = require('./src/app/server');

// module.exports.handler = serverless(app);
module.exports = app;