exports.seed = async function(knex) {
  await knex('transactions').del();

  const products = await knex('products').select('id', 'buy_price', 'sell_price');
  const byId = Object.fromEntries(products.map(p => [p.id, p]));

  const makeTransaction = (productId, userId, type, quantity, date) => {
    const p = byId[productId];
    const price = type === 'in' ? Number(p.buy_price) : Number(p.sell_price);
    const total = price * quantity;
    return { product_id: productId, user_id: userId, type, quantity, total_price: total, date };
  };

  const today = new Date().toISOString().slice(0, 10);

  const rows = [
    makeTransaction(1, 1, 'in', 20, today),
    makeTransaction(2, 1, 'in', 10, today),
    makeTransaction(3, 2, 'in', 5, today),
    makeTransaction(1, 2, 'out', 3, today),
    makeTransaction(2, 1, 'out', 2, today),
    makeTransaction(3, 2, 'out', 1, today),
  ];

  await knex('transactions').insert(rows);
};