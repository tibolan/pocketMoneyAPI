const express = require('express');
const router = express.Router();
const throwError = require('../components/ThrowApiError')
const mongoose = require("mongoose");
const schemaManager = require('../schema/schemaManager')
const Amends = schemaManager.getSchema('Amends', 1)

try {
    mongoose.connect(process.env.MONGO_DB_STRING)
} catch (e) {
    console.log(e)
}

router.get('/', async function (req, res, next) {
    let all = await Amends.model.find().exec()
    return res.json(all)
});
router.post('/filter', async function (req, res, next) {
    let all
    if (req.body) {
        all = await Amends.model.find(req.body).exec()
    } else {
        all = await Amends.model.find().exec()
    }
    return res.json(all)
});
router.get('/:id', async function (req, res, next) {
    try {
        let one = await Amends.model.findById(req.params.id).exec()
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
});
router.post('/', function (req, res, next) {
    let Amend = new Amends(req.body)
    if (Amend.validate()) {
        return Amend.save()
    } else {
        return res.status(400, "UI model do not corresponding to API model")
    }
});
module.exports = router;
