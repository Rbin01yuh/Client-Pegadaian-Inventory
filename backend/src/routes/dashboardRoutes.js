import { overview } from '../controllers/dashboardController.js';
import { verifyToken, authorizeRoles } from '../utils/auth.js';

export default {
  name: 'dashboardRoutes',
  register: async (server) => {
    server.route([
      { method: 'GET', path: '/api/dashboard/overview', options: { pre: [verifyToken, authorizeRoles(['admin'])] }, handler: overview },
    ]);
  },
};