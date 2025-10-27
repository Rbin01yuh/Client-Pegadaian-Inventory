exports.seed = async function(knex) {
  await knex('products').del();

  await knex('products').insert([
    { id: 1, name: 'Mouse Wireless', sku: 'MW-001', category: 'Accessories', stock: 100, supplier_id: 1, buy_price: 75000, sell_price: 120000, image_url: '' },
    { id: 2, name: 'Keyboard Mechanical', sku: 'KM-101', category: 'Accessories', stock: 50, supplier_id: 2, buy_price: 350000, sell_price: 500000, image_url: '' },
    { id: 3, name: 'Monitor 24"', sku: 'MN-240', category: 'Display', stock: 25, supplier_id: 3, buy_price: 1500000, sell_price: 2000000, image_url: '' },
  ]);
};