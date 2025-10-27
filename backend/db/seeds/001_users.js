const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashAdmin = await bcrypt.hash('admin123', 10);
  const hashStaff = await bcrypt.hash('staff123', 10);

  await knex('users').insert([
    { id: 1, username: 'admin', password: hashAdmin, role: 'admin' },
    { id: 2, username: 'staff', password: hashStaff, role: 'staff' },
  ]);
};