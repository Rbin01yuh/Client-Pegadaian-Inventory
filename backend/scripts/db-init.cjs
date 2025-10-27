require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const {
    DB_HOST = '127.0.0.1',
    DB_PORT = 3306,
    DB_USER = 'root',
    DB_PASSWORD = '',
    DB_NAME = 'smart_inventory',
  } = process.env;

  try {
    const conn = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Database ensured: ${DB_NAME}`);
    await conn.end();
  } catch (err) {
    console.error('Failed to init database:', err.message);
    process.exit(1);
  }
})();