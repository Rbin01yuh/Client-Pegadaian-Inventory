import db from '../config/database.js';
import { success, fail } from '../utils/response.js';

export async function report(request, h) {
  try {
    // Laporan stok dan transaksi ringkas
    const products = await db('products').select('id', 'name', 'category', 'stock', 'buy_price', 'sell_price');
    const transactions = await db('transactions').select('id', 'product_id', 'type', 'quantity', 'total_price', 'date');

    const res = success({ products, transactions }, 'Report generated');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}