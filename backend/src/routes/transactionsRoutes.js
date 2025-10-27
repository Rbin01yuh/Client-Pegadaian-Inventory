import { transactionCreateSchema } from '../validations/transaction.js';
import { list, create } from '../controllers/transactionsController.js';
import { verifyToken, authorizeRoles } from '../utils/auth.js';

const validateDefaults = {
  options: { allowUnknown: true, stripUnknown: true },
  failAction: (request, h, err) => {
    console.error('Transactions payload validation error:', err?.details || err?.message || err);
    throw err;
  },
};

export default {
  name: 'transactionsRoutes',
  register: async (server) => {
    server.route([
      { method: 'GET', path: '/api/transactions', options: { pre: [verifyToken] }, handler: list },
      { method: 'POST', path: '/api/transactions', options: { pre: [verifyToken, authorizeRoles(['admin', 'staff'])], validate: { payload: transactionCreateSchema, ...validateDefaults } }, handler: create },
    ]);
  },
};