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
        console.log(all)
        return res.json(all)
    })
    router.post('/', async function(req, res, next) {
        let Deposit = new model(req.body)
        Deposit.save()
        return res.json(Deposit)
    })
    return router
}

module.exports = setRouter
