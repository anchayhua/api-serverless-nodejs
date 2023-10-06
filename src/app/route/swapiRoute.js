const express = require('express');

const swapiProxy = require('../proxy/swapiProxy')

const router = express.Router();

// GET, SWAPI
router.get('/', (req, res) => {

    swapiProxy.get()
        .then(data => {
            res.json({
                confirmation: 'success',
                data: data
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
})

module.exports = router