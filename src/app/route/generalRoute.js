const express = require('express');

const generalController = require('../controller/generalController')

const router = express.Router();

// GET, POST, PUT, DELETE
router.get('/', (req, res) => {

    const filters = req.query

    generalController.get(filters)
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

router.get('/:generalId', (req, res) => {

    const id = req.params

    generalController.getById(id)
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

// POST - create new entities:
router.post('/', (req, res) => {

    generalController.post(req.body)
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

// PUT - updating resources
router.put('/', (req, res) => {

    generalController.put(req.body)
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

// DELETE
router.delete('/:generalId', (req, res) => {

    generalController.delete(req.params)
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