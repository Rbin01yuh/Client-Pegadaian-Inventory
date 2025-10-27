/** @param {import('knex').Knex} knex */
exports.seed = async function seed(knex) {
  await knex('suppliers').del();
  await knex('suppliers').insert([
    { id: 1, name: 'PT Sumber Makmur', contact: '021-555-0123', address: 'Jl. Merdeka No. 1, Jakarta' },
    { id: 2, name: 'CV Berkah Abadi', contact: '022-777-0456', address: 'Jl. Asia Afrika No. 12, Bandung' },
    { id: 3, name: 'UD Jaya Sentosa', contact: '031-888-0789', address: 'Jl. Diponegoro No. 5, Surabaya' },
  ]);
};