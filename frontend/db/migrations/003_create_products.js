/** @param {import('knex').Knex} knex */
exports.up = async function up(knex) {
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('sku', 50).notNullable().unique();
    table.string('category', 50).notNullable();
    table.integer('stock').notNullable().defaultTo(0);
    table
      .integer('supplier_id')
      .unsigned()
      .references('id')
      .inTable('suppliers')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    table.decimal('buy_price', 10, 2).notNullable();
    table.decimal('sell_price', 10, 2).notNullable();
    table.text('image_url');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/** @param {import('knex').Knex} knex */
exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('products');
};