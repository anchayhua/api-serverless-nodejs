const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('¡Hola desde la ruta raíz!');
});

app.use('/general', require('./route/generalRoute'));
app.use('/swapi', require('./route/swapiRoute'));

module.exports = app