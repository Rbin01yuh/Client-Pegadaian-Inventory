/**
 * Users table
 */

export async function up(knex) {
  await knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username', 100).notNullable().unique();
    table.string('password', 255).notNullable();
    table.enum('role', ['admin', 'staff']).notNullable().defaultTo('staff');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}