/** @param {import('knex').Knex} knex */
exports.seed = async function seed(knex) {
  // Clear existing
  await knex('users').del();
  // Insert dummy users (plain passwords for demo; hash in production)
  await knex('users').insert([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'staff', password: 'staff123', role: 'staff' },
  ]);
};