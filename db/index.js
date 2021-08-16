const pgp = require('pg-promise')();
const key = require('./config');

const credentials = {
  host: '18.218.250.125',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: key.password
};

const db = pgp(credentials);
module.exports = db;
