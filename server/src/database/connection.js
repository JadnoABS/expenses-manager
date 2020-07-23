const knex = require('knex'),
    configuration = require('../../knexfile'),
    connection = knex(configuration.development);

module.exports = connection;