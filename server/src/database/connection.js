const knex = require('knex'),
    configuration = require('../../knexfile'),
    connection = knex(configuration);

module.exports = connection;
