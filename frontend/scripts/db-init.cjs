require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'smart_inventory';

  let conn;
  try {
    conn = await mysql.createConnection({ host, port, user, password, database: 'mysql' });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' ensured/created.`);
  } catch (err) {
    console.error('Failed to ensure database:', err.message);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
})();