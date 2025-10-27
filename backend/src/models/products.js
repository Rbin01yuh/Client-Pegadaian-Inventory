import db from '../config/database.js';

export async function listProducts() {
  return db('products').select('*');
}

export async function getProduct(id) {
  return db('products').where({ id }).first();
}

export async function createProduct(payload) {
  const [id] = await db('products').insert(payload);
  return getProduct(id);
}

export async function updateProduct(id, payload) {
  await db('products').where({ id }).update(payload);
  return getProduct(id);
}

export async function deleteProduct(id) {
  const deleted = await db('products').where({ id }).del();
  return deleted > 0;
}