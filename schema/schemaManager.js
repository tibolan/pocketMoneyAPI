const mongoose = require("mongoose");

class abstract {

}


const schemaManager = (function () {
    return {
        startDB (connectionString) {
            try {
                mongoose.connect(connectionString)
            } catch (e) {
                console.log(e)
            }
        },
        getSchema (schemaName, schemaVersion) {
            let schema = require(`./v${schemaVersion}/${schemaName}/index.js`)
            return schema
        }
    }
}());
module.exports = schemaManager
