/**
 * Suppliers table
 */

export async function up(knex) {
  await knex.schema.createTable('suppliers', function(table) {
    table.increments('id').primary();
    table.string('name', 150).notNullable();
    table.string('contact', 100).notNullable();
    table.string('address', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('suppliers');
}