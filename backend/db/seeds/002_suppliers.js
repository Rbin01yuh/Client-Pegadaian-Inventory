exports.seed = async function(knex) {
  await knex('suppliers').del();
  await knex('suppliers').insert([
    { id: 1, name: 'PT Sumber Makmur', contact: '081234567890', address: 'Jl. Merdeka No. 1 Jakarta' },
    { id: 2, name: 'CV Berkah Jaya', contact: '082233445566', address: 'Jl. Sudirman No. 99 Bandung' },
    { id: 3, name: 'UD Sentosa', contact: '085778899001', address: 'Jl. Diponegoro No. 7 Surabaya' },
  ]);
};