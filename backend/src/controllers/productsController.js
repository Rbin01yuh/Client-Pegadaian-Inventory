import { success, fail } from '../utils/response.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../models/products.js';

export async function list(request, h) {
  try {
    const rows = await listProducts();
    const res = success(rows, 'Products fetched');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function get(request, h) {
  try {
    const { id } = request.params;
    const row = await getProduct(Number(id));
    if (!row) return h.response({ status: 'error', message: 'Not found' }).code(404);
    const res = success(row, 'Product fetched');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function create(request, h) {
  try {
    const p = request.payload;
    const supplierId = p.supplier_id ?? p.supplierId ?? (p.supplier && p.supplier.id);
    const payload = {
      name: p.name ?? p.product_name ?? p.title,
      sku: p.sku ?? p.code ?? p.productCode,
      category: p.category ?? 'Umum',
      stock: Number.isFinite(Number(p.stock)) ? Number(p.stock) : 0,
      supplier_id: Number.isFinite(Number(supplierId)) ? Number(supplierId) : supplierId,
      buy_price: Number.isFinite(Number(p.buy_price ?? p.buyPrice ?? p.purchase_price)) ? Number(p.buy_price ?? p.buyPrice ?? p.purchase_price) : 0,
      sell_price: Number.isFinite(Number(p.sell_price ?? p.sellPrice ?? p.price)) ? Number(p.sell_price ?? p.sellPrice ?? p.price) : 0,
      image_url: p.image_url ?? p.imageUrl ?? '',
    };
    const product = await createProduct(payload);
    const res = success(product, 'Product created successfully', 201);
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function update(request, h) {
  try {
    const { id } = request.params;
    const product = await updateProduct(Number(id), request.payload);
    const res = success(product, 'Product updated successfully');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function remove(request, h) {
  try {
    const { id } = request.params;
    const ok = await deleteProduct(Number(id));
    if (!ok) return h.response({ status: 'error', message: 'Not found' }).code(404);
    const res = success(null, 'Product deleted successfully');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}