const express = require('express');
const router = express.Router();

const setRouter = function (model) {
    router.get('/', async function(req, res, next) {
        let oQuery = Object.fromEntries(new URLSearchParams(req.query))
        let all
        if (Object.keys(oQuery).length) {
            all = await model.find(oQuery).exec()
        } else {
            all = await model.find().exec()
        }
        return res.json(all)
    })
    router.get('/:id', async function (req, res, next) {
        try {
            let one = await model.findById(req.params.id)
            console.log(one)
            console.log(one.toJSON())
            if (one) {
                return res.json(one)
            } else {
                return res.status(404).send({
                    "status": 404,
                    "message": `Amend not found: ${req.params.id}`
                })
            }
        } catch (e) {
            return res.status(500).send(e)
        }
    })
    router.delete('/:id', async function (req, res, next) {
        try {
            let del = await model.deleteOne({
                _id: req.params.id
            })
            return res.status(200).json(del)
        } catch (e) {
            return res.status(500).json({
                status: false
            })
        }
    })
    router.post('/', async function (req, res, next) {
        let Amend = new model(req.body)
        console.log(Amend)
        Amend.save()
        return res.json(Amend)
    })
    return router
}

module.exports = setRouter
