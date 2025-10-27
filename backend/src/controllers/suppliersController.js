import { success, fail } from '../utils/response.js';
import { listSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier } from '../models/suppliers.js';

export async function list(request, h) {
  try {
    const rows = await listSuppliers();
    const res = success(rows, 'Suppliers fetched');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function get(request, h) {
  try {
    const { id } = request.params;
    const row = await getSupplier(Number(id));
    if (!row) return h.response({ status: 'error', message: 'Not found' }).code(404);
    const res = success(row, 'Supplier fetched');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function create(request, h) {
  try {
    const p = request.payload;
    const payload = {
      name: p.name,
      contact: p.contact ?? p.phone ?? p.email ?? 'N/A',
      address: p.address ?? 'N/A',
    };
    const supplier = await createSupplier(payload);
    const res = success(supplier, 'Supplier created successfully', 201);
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function update(request, h) {
  try {
    const { id } = request.params;
    const p = request.payload;
    const payload = {
      name: p.name,
      contact: p.contact ?? p.phone ?? p.email ?? 'N/A',
      address: p.address ?? 'N/A',
    };
    const supplier = await updateSupplier(Number(id), payload);
    const res = success(supplier, 'Supplier updated successfully');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}

export async function remove(request, h) {
  try {
    const { id } = request.params;
    const ok = await deleteSupplier(Number(id));
    if (!ok) return h.response({ status: 'error', message: 'Not found' }).code(404);
    const res = success(null, 'Supplier deleted successfully');
    return h.response(res.result).code(res.statusCode);
  } catch (err) {
    const res = fail(err.message, 500);
    return h.response(res.result).code(res.statusCode);
  }
}