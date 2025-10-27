import { productCreateSchema, productUpdateSchema } from '../validations/product.js';
import { list, get, create, update, remove } from '../controllers/productsController.js';
import { verifyToken, authorizeRoles } from '../utils/auth.js';

const validateDefaults = {
  options: { allowUnknown: true, stripUnknown: true },
  failAction: (request, h, err) => {
    console.error('Products payload validation error:', err?.details || err?.message || err);
    throw err;
  },
};

export default {
  name: 'productsRoutes',
  register: async (server) => {
    server.route([
      { method: 'GET', path: '/api/products', options: { pre: [verifyToken] }, handler: list },
      { method: 'GET', path: '/api/products/{id}', options: { pre: [verifyToken] }, handler: get },
      { method: 'POST', path: '/api/products', options: { pre: [verifyToken, authorizeRoles(['admin'])], validate: { payload: productCreateSchema, ...validateDefaults } }, handler: create },
      { method: 'PUT', path: '/api/products/{id}', options: { pre: [verifyToken, authorizeRoles(['admin'])], validate: { payload: productUpdateSchema, ...validateDefaults } }, handler: update },
      { method: 'DELETE', path: '/api/products/{id}', options: { pre: [verifyToken, authorizeRoles(['admin'])] }, handler: remove },
    ]);
  },
};