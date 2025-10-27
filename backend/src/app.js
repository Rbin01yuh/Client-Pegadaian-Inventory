import Hapi from '@hapi/hapi';
import 'dotenv/config';

// Routes plugins
import authRoutes from './routes/authRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import suppliersRoutes from './routes/suppliersRoutes.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import reportsRoutes from './routes/reportsRoutes.js';

export async function createServer() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['authorization', 'content-type'],
      },
    },
  });

  // Global error handler to keep JSON uniform
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    // Hapi errors or exceptions
    if (response?.isBoom) {
      const { statusCode, payload } = response.output;
      return h.response({ status: 'error', message: payload?.message || 'Error', data: null }).code(statusCode);
    }
    // Non-JSON or missing status formatting — pass through
    return h.continue;
  });

  // Register routes as plugins
  await server.register([
    authRoutes,
    productsRoutes,
    suppliersRoutes,
    transactionsRoutes,
    dashboardRoutes,
    reportsRoutes,
  ]);

  // Health check
  server.route({ method: 'GET', path: '/health', handler: () => ({ status: 'ok' }) });

  return server;
}