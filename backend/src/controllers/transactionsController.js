import { success, fail } from '../utils/response.js';
import { listTransactions, createTransaction } from '../models/transactions.js';

export async function list(request, h) {
  try {
    const rows = await listTransactions();
    const res = success(rows, 'Transactions fetched');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function create(request, h) {
  try {
    const p = request.payload;
    const auth = request.auth?.credentials;
    const tRaw = (p.type || '').toString().toLowerCase();
    const tNorm = tRaw === 'incoming' ? 'in' : tRaw === 'outgoing' ? 'out' : tRaw;
    const payload = {
      product_id: p.product_id ?? p.productId,
      sku: p.sku,
      type: tNorm,
      quantity: Number.isFinite(Number(p.quantity)) ? Number(p.quantity) : 0,
      total_price: Number.isFinite(Number(p.total_price)) ? Number(p.total_price) : undefined,
      date: p.date ?? new Date().toISOString().slice(0, 10),
      note: p.note ?? '',
      user_id: auth?.id || auth?.user?.id,
    };
    const t = await createTransaction(payload);
    const res = success(t, 'Transaction created successfully', 201);
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}