import db from '../config/database.js';

export async function listSuppliers() {
  return db('suppliers').select('*');
}

export async function getSupplier(id) {
  return db('suppliers').where({ id }).first();
}

export async function createSupplier(payload) {
  const [id] = await db('suppliers').insert(payload);
  return getSupplier(id);
}

export async function updateSupplier(id, payload) {
  await db('suppliers').where({ id }).update(payload);
  return getSupplier(id);
}

export async function deleteSupplier(id) {
  const deleted = await db('suppliers').where({ id }).del();
  return deleted > 0;
}