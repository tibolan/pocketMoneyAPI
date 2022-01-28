const mongoose = require('mongoose')
const schema = require("./schema")
const router = require("./router")
const query = require("./query")
const migration = require("./migration");

const AmendsSchema = new mongoose.Schema(schema)
const AmendsModel = mongoose.model('Amends', AmendsSchema)

module.exports = {
    schema: AmendsSchema,
    model: AmendsModel,
    migration,
    query,
    router: router(AmendsModel)
}
