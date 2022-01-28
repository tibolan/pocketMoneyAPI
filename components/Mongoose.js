const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const throwError = require('../components/ThrowApiError')
const schemaManager = require('../schema/schemaManager')
const Amends = schemaManager.getSchema('Amends', 1)

async function main () {
    await mongoose.connect(process.env.MONGO_DB_STRING)

    createFixtures()

    // let one = await Amends.model.findOne({_id: "61e965bab2400a6543cb4677"}).exec()
    // let all = await Amends.model.find().exec()
    let filtered = await Amends.model.find({
        fee: {$lt: 40}
    }).exec()
}
main()
    .catch(err => console.log(err))
    .finally(() => {
        process.exit(1);
    })


function createFixtures () {
    let testAmend = new Amends.model({
        comments: "yo " + Math.random() * 100000000,
        fee: Math.floor(Math.random() * 100),
        date: Date.now(),
        kind: 'RAN'
    })

    testAmend.save((err) => {
        if (err) throwError(err)
    })
}

/*
const kittySchema = new mongoose.Schema({
    name: String
});
kittySchema.methods.speak = function () {
    const greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    console.log(greeting);
}

async function main() {
    console.log('main', MONGO_DB)
    await mongoose.connect(MONGO_DB)
    const Kitten = mongoose.model('Kitten', kittySchema);
    const silence = new Kitten({ name: 'Silence' });
    console.log(silence.speak()); // 'Silence'


    const fluffy = new Kitten({ name: 'fluffy' });
    await fluffy.save((err) => {
        console.log('save fluffy failed')
        console.log(err)
    })
    fluffy.speak();


    console.log(Kitten.find())
}

main().catch(err => console.log(err));*/
