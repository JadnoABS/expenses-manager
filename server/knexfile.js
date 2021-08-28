const dotenv = require("dotenv").config();
const pg = require('pg');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
pg.defaults.ssl = true;
module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS
  },
  migrations: {
    directory: __dirname + "/src/database/migrations",
  },
};
