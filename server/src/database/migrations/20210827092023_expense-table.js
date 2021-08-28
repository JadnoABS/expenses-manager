exports.up = function(knex) {
  return knex.schema.createTable('expenses', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('description', 'longtext');
    table.decimal('value').notNullable();
    table.timestamps(true, true);

    table.string('user_id').notNullable();

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('expenses');
};
