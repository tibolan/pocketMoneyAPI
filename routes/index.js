const express = require('express');
const router = express.Router();
const PocketMoney = require('../components/PocketMoney')
const Mongo = require('../components/Mongo')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json(PocketMoney);
});
router.get('/referentials', async function (req, res, next) {
    let amends = await Mongo.ReadAll('amendsType', null)
    let deposits = await Mongo.ReadAll('depositsType', null)
    let refs = await Mongo.ReadAll('referentials', null)
    let parameters = {}

    refs.documents.forEach((param) => {
        parameters[param.key] = param.value
    })

    let referentials = {
        amends: amends.documents,
        deposits: deposits.documents,
        parameters
    }
    res.json(referentials);
});

router.get('/check/:code', async function (req, res, next) {
    res.json({
        status: req.params.code === '2027'
    });
});

module.exports = router;
