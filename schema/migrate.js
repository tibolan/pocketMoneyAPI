const schemaManager = require('./schemaManager')

global.__basedir = __dirname;

/* MONGO */
const DB_NAME = "PocketMoneyAPI_v2"
const MONGO_DB = `mongodb+srv://tibolan:toubeau1177@cluster0.emkg2.mongodb.net/${DB_NAME}?authSource=admin&replicaSet=atlas-7aaq2k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
schemaManager.startDB(MONGO_DB)


/* MODELS */
const Amends = schemaManager.getSchema('Amends', 1)
const Deposits = schemaManager.getSchema('Deposits', 1)


Amends.migration(Amends.model)
