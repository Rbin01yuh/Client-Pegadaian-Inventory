import db from '../config/database.js';
import { success, fail } from '../utils/response.js';

export async function overview(request, h) {
  try {
    const [{ totalProducts }] = await db('products').count({ totalProducts: '*' });
    const [{ totalSuppliers }] = await db('suppliers').count({ totalSuppliers: '*' });
    const [{ totalStock }] = await db('products').sum({ totalStock: 'stock' });

    const today = new Date().toISOString().slice(0, 10);
    const [{ transactionsToday }] = await db('transactions').where({ date: today }).count({ transactionsToday: '*' });

    const data = {
      total_products: Number(totalProducts || 0),
      total_suppliers: Number(totalSuppliers || 0),
      total_stock: Number(totalStock || 0),
      transactions_today: Number(transactionsToday || 0),
    };

    const res = success(data, 'Dashboard overview fetched');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}