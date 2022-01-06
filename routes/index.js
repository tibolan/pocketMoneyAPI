const express = require('express');
const router = express.Router();
const PocketMoney = require('../components/PocketMoney')
const Mongo = require('../components/Mongo')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json(PocketMoney);
});
router.get('/referentials', async function (req, res, next) {
    let reasons = await Mongo.ReadAll('reasons', null)
    console.log(reasons)
    res.json(reasons.documents);
});

router.get('/check/:code', async function (req, res, next) {
    res.json({
        status: req.params.code === '1234'
    });
});

router.post('/fee/:user', async function (req, res, next) {
    let user = await Mongo.Create('amends',
        Object.assign({name: req.params.user}, req.body)
    )
    res.json(user);
});
router.delete('/fee/:id', async function (req, res, next) {
    let user = await Mongo.Delete('amends', req.params.id)
    console.log(req.params.id, user)
    res.json(user);
});
router.get('/user/:user', async function (req, res, next) {
    let user = await Mongo.Read('viewUserFull',
        {
            name: req.params.user
        }
    )
    console.log(user)
    res.json(user.document);
});

module.exports = router;
