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

router.post('/fee/:user', async function (req, res, next) {
    let user = await Mongo.Create('amends',
        Object.assign({name: req.params.user}, req.body)
    )
    res.json(user);
});
router.put('/fee/:user/:id', async function (req, res, next) {
    console.log(req.body)
    let user = await Mongo.Update('amends', req.params.id, Object.assign({name: req.params.user}, req.body))
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
router.get('/deposit/:user/by', async function (req, res, next) {
    let user = await Mongo.Read('deposits',
        Object.assign({
            name: req.params.user
        }, req.body)
    )
    res.json(user.document);
});
router.get('/deposit/:user', async function (req, res, next) {
    let user = await Mongo.Read('deposits',
        {
            name: req.params.user
        }
    )
    res.json(user.document);
});
router.post('/deposit/:user', async function (req, res, next) {
    let user = await Mongo.Create('deposits',
        Object.assign({name: req.params.user}, req.body)
    )
    res.json(user);
});
router.delete('/deposit/:id', async function (req, res, next) {
    let user = await Mongo.Delete('deposits', req.params.id)
    res.json(user);
});

module.exports = router;
