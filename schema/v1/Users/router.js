const express = require('express');
const router = express.Router();

const setRouter = function (model) {
    router.get('/', async function (req, res, next) {
        let all = await model.find().exec()
        return res.json(all)
    })
    router.get('/:user', async function (req, res, next) {
        let agg = await model.aggregate([
            {$match: {name: req.params.user}},
            {$lookup: {from: "amends", localField: "name", foreignField: "user", as: "amends"}},
            {$lookup: {from: "deposits", localField: "name", foreignField: "user", as: "deposits"}},
        ], (error, result) => {
            if (error) throw "nop"
            return result
        })
        return res.json(agg[0])
    })
    return router
}

module.exports = setRouter
