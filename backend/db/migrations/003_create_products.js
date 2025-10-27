/**
 * Products table
 */

export async function up(knex) {
  await knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('name', 200).notNullable();
    table.string('sku', 100).notNullable().unique();
    table.string('category', 100).notNullable();
    table.integer('stock').notNullable().defaultTo(0);
    table.integer('supplier_id').unsigned().references('id').inTable('suppliers').onUpdate('CASCADE').onDelete('RESTRICT');
    table.decimal('buy_price', 10, 2).notNullable().defaultTo(0);
    table.decimal('sell_price', 10, 2).notNullable().defaultTo(0);
    table.string('image_url', 255);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('products');
}