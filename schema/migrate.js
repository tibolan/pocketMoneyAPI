const schemaManager = require('./schemaManager')

global.__basedir = __dirname;

/* MONGO */
schemaManager.startDB(process.env.MONGO_DB_STRING)


/* MODELS */
const Amends = schemaManager.getSchema('Amends', 1)
const Deposits = schemaManager.getSchema('Deposits', 1)


Amends.migration(Amends.model)
