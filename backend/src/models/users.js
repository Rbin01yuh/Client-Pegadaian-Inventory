import db from '../config/database.js';

export async function findByUsername(username) {
  return db('users').where({ username }).first();
}

export async function findByEmail(email) {
  const hasEmail = await db.schema.hasColumn('users', 'email');
  if (hasEmail) {
    return db('users').where({ email }).first();
  }
  // Fallback ke username jika kolom email belum ada
  return db('users').where({ username: email }).first();
}

export async function createUser({ name, email, password, role }) {
  const hasEmail = await db.schema.hasColumn('users', 'email');
  const hasName = await db.schema.hasColumn('users', 'name');

  const insertData = { password, role };
  if (hasEmail) insertData.email = email; else insertData.username = email; // simpan email di username jika kolom email belum ada
  if (hasName) insertData.name = name;

  const [id] = await db('users').insert(insertData);
  return { id, name: insertData.name ?? null, email: insertData.email ?? null, username: insertData.username ?? null, role };
}