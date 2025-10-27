/** @param {import('knex').Knex} knex */
exports.seed = async function seed(knex) {
  await knex('transactions').del();

  // Get product prices to compute total_price
  const products = await knex('products').select('id', 'buy_price', 'sell_price');
  const byId = new Map(products.map((p) => [p.id, p]));

  const tx = [
    // Incoming stock (purchase)
    { product_id: 1, user_id: 1, type: 'in', quantity: 50, date: '2025-01-05' },
    { product_id: 2, user_id: 1, type: 'in', quantity: 100, date: '2025-01-08' },
    { product_id: 3, user_id: 2, type: 'in', quantity: 30, date: '2025-01-10' },
    // Outgoing stock (sales/usage)
    { product_id: 1, user_id: 2, type: 'out', quantity: 20, date: '2025-01-12' },
    { product_id: 2, user_id: 2, type: 'out', quantity: 40, date: '2025-01-15' },
    { product_id: 3, user_id: 1, type: 'out', quantity: 10, date: '2025-01-18' },
  ].map((t, idx) => {
    const p = byId.get(t.product_id);
    const price = t.type === 'in' ? Number(p.buy_price) : Number(p.sell_price);
    return { ...t, id: idx + 1, total_price: price * t.quantity };
  });

  await knex('transactions').insert(tx);
};