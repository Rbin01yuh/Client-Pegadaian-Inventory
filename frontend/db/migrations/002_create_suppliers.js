/** @param {import('knex').Knex} knex */
exports.up = async function up(knex) {
  await knex.schema.createTable('suppliers', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('contact', 100).notNullable();
    table.text('address').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/** @param {import('knex').Knex} knex */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('suppliers');
};