const dotenv = require("dotenv").config();
const pg = require('pg');

if (process.env.NODE_ENV === 'production') {
    pg.defaults.ssl = { rejectUnauthorized: false };
}
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
