const pgp = require("pg-promise")();

const credentials = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'postgres'
};

const db = pgp(credentials);
module.exports = db;