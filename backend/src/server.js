import { createServer } from './app.js';
import 'dotenv/config';

(async () => {
  try {
    const server = await createServer();
    await server.start();
    console.log(`✅ Server running at: ${server.info.uri}`);
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();