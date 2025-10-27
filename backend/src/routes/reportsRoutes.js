import { report } from '../controllers/reportsController.js';
import { verifyToken, authorizeRoles } from '../utils/auth.js';

export default {
  name: 'reportsRoutes',
  register: async (server) => {
    server.route([
      { method: 'GET', path: '/api/reports', options: { pre: [verifyToken, authorizeRoles(['admin'])] }, handler: report },
    ]);
  },
};