import db from '../config/database.js';

export async function listTransactions() {
  return db('transactions').select('*').orderBy('date', 'desc');
}

export async function createTransaction({ product_id, user_id, type, quantity, date }) {
  return db.transaction(async trx => {
    const product = await trx('products').where({ id: product_id }).first();
    if (!product) throw new Error('Product not found');

    const price = type === 'in' ? Number(product.buy_price) : Number(product.sell_price);
    const total = price * quantity;

    // Update stock accordingly
    const newStock = type === 'in' ? product.stock + quantity : product.stock - quantity;
    if (newStock < 0) throw new Error('Insufficient stock');

    await trx('products').where({ id: product_id }).update({ stock: newStock });

    const [id] = await trx('transactions').insert({ product_id, user_id, type, quantity, total_price: total, date });
    return trx('transactions').where({ id }).first();
  });
}