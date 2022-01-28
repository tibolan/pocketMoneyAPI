const mongoose = require('mongoose')
const schema = require("./schema")
const router = require("./router")
const query = require("./query")
const migration = require("./migration");

const UsersSchema = new mongoose.Schema(schema)
const UsersModel = mongoose.model('Users', UsersSchema)

module.exports = {
    schema: UsersSchema,
    model: UsersModel,
    migration,
    query,
    router: router(UsersModel)
}