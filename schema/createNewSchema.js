const prompt = require('prompt');
const fs = require("fs").promises;

let params = {}

var schema = {
    properties: {
        name: {
            description: 'Nom du schema',
            pattern: /^[A-Z][a-z]+s$/i,
            message: 'Must be plural alphabetical string',
            required: true,
            default: "Tests"
        },
        version: {
            description: 'Version du schema',
            pattern: /^[1-9][0-9]*$/i,
            message: 'Must be an integer',
            required: true,
            default: 1
        }
    }
};

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: email, password
//
prompt.get(schema, function (err, result) {
    params.name = result.name
    params.version = +result.version
    createSchema(params)
});


async function createSchema ({name, version}) {
    const dir = `./v${version}`
    const schemaPath = `${dir}/${name}`
    const stats = await fs.lstat(dir)

    // create version directory if needed
    if (!stats.isDirectory()) {
        fs.mkdir(dir)
    }

    // create directory
    fs.mkdir(schemaPath, {recursive: false}).catch(e => {
        if (e.code === "EEXIST") {
            console.error(`Schema "${name} v${version}" already exists`)
        } else {
            console.error(e)
        }
    })

    /** index.js */
    fs.writeFile(`${schemaPath}/index.js`, `const mongoose = require('mongoose')
const schema = require("./schema")
const router = require("./router")
const query = require("./query")
const migration = require("./migration");

const ${name}Schema = new mongoose.Schema(schema)
const ${name}Model = mongoose.model('${name}', ${name}Schema)

module.exports = {
    schema: ${name}Schema,
    model: ${name}Model,
    migration,
    query,
    router: router(${name}Model)
}`)

    /** migration.js */
    fs.writeFile(`${schemaPath}/migration.js`, `const migration = {
  online: [],
  offline: []
}
module.exports = migration`)

    /** schema.js */
    fs.writeFile(`${schemaPath}/schema.js`, `module.exports = {
    name: String
}`)

    /** router.js */
    fs.writeFile(`${schemaPath}/router.js`, `const express = require('express');
const router = express.Router();

const setRouter = function (model) {
    router.get('/', async function(req, res, next) {
        let all = await model.find().exec()
        return res.json(all)
    })
    return router
}

module.exports = setRouter
`)

    /** query.js */
    fs.writeFile(`${schemaPath}/query.js`, `module.exports = function (model) {
    return {
        async findOne (id) {
            const Q = await model.findById(id)
            return Q.exec()
        }
    }
}`)}
