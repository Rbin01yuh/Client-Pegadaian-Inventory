import { supplierCreateSchema, supplierUpdateSchema } from '../validations/supplier.js';
import { list, get, create, update, remove } from '../controllers/suppliersController.js';
import { verifyToken, authorizeRoles } from '../utils/auth.js';

const validateDefaults = {
  options: { allowUnknown: true, stripUnknown: true },
  failAction: (request, h, err) => {
    console.error('Suppliers payload validation error:', err?.details || err?.message || err);
    throw err;
  },
};

export default {
  name: 'suppliersRoutes',
  register: async (server) => {
    server.route([
      { method: 'GET', path: '/api/suppliers', options: { pre: [verifyToken] }, handler: list },
      { method: 'GET', path: '/api/suppliers/{id}', options: { pre: [verifyToken] }, handler: get },
      { method: 'POST', path: '/api/suppliers', options: { pre: [verifyToken, authorizeRoles(['admin'])], validate: { payload: supplierCreateSchema, ...validateDefaults } }, handler: create },
      { method: 'PUT', path: '/api/suppliers/{id}', options: { pre: [verifyToken, authorizeRoles(['admin'])], validate: { payload: supplierUpdateSchema, ...validateDefaults } }, handler: update },
      { method: 'DELETE', path: '/api/suppliers/{id}', options: { pre: [verifyToken, authorizeRoles(['admin'])] }, handler: remove },
    ]);
  },
};