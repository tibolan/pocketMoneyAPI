const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors')
const schemaManager = require('./schema/schemaManager')

global.__basedir = __dirname;

/* MONGO */
const DB_NAME = "PocketMoneyAPI_v2"
const MONGO_DB = `mongodb+srv://tibolan:toubeau1177@cluster0.emkg2.mongodb.net/${DB_NAME}?authSource=admin&replicaSet=atlas-7aaq2k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
schemaManager.startDB(MONGO_DB)


/* MODELS */
const Amends = schemaManager.getSchema('Amends', 1)
const Deposits = schemaManager.getSchema('Deposits', 1)
const Users = schemaManager.getSchema('Users', 1)


const indexRouter = require('./routes/index');

const app = express();
app.set('json spaces', 4)

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', Users.router);
app.use('/amends', Amends.router);
app.use('/deposits', Deposits.router);


module.exports = app;
