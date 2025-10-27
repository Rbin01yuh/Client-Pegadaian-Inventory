/** @param {import('knex').Knex} knex */
exports.seed = async function seed(knex) {
  await knex('products').del();
  await knex('products').insert([
    {
      id: 1,
      name: 'Kertas A4 80gsm',
      sku: 'SKU-001-A4',
      category: 'ATK',
      stock: 100,
      supplier_id: 1,
      buy_price: 45000.00,
      sell_price: 55000.00,
      image_url: 'https://picsum.photos/seed/sku001/400/300',
    },
    {
      id: 2,
      name: 'Pulpen Gel Hitam',
      sku: 'SKU-002-PEN',
      category: 'ATK',
      stock: 200,
      supplier_id: 2,
      buy_price: 5000.00,
      sell_price: 8000.00,
      image_url: 'https://picsum.photos/seed/sku002/400/300',
    },
    {
      id: 3,
      name: 'Amplop Coklat F4',
      sku: 'SKU-003-ENV',
      category: 'ATK',
      stock: 80,
      supplier_id: 1,
      buy_price: 1500.00,
      sell_price: 2500.00,
      image_url: 'https://picsum.photos/seed/sku003/400/300',
    },
  ]);
};