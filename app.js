require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors')

/* MONGO */
const schemaManager = require('./schema/schemaManager')
schemaManager.startDB(process.env.MONGO_DB_STRING)
global.__basedir = __dirname;

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
