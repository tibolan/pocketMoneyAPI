const mongoose = require('mongoose')
const schema = require("./schema")
const router = require("./router")
const query = require("./query")
const migration = require("./migration");

const DepositsSchema = new mongoose.Schema(schema)
const DepositsModel = mongoose.model('Deposits', DepositsSchema)

module.exports = {
    schema: DepositsSchema,
    model: DepositsModel,
    migration,
    query,
    router: router(DepositsModel)
}