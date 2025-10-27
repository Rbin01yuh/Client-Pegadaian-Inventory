/**
 * Transactions table
 */

export async function up(knex) {
  await knex.schema.createTable('transactions', function(table) {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate('CASCADE').onDelete('RESTRICT');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT');
    table.enum('type', ['in', 'out']).notNullable();
    table.integer('quantity').notNullable();
    table.decimal('total_price', 10, 2).notNullable();
    table.date('date').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('transactions');
}