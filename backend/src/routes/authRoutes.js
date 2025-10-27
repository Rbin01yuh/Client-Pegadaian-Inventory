import Joi from 'joi';
import { registerSchema, loginSchema } from '../validations/auth.js';
import { register, login } from '../controllers/authController.js';

export default {
  name: 'authRoutes',
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/api/auth/register',
        options: {
          validate: { payload: registerSchema, failAction: (request, h, err) => h.response({ status: 'error', message: 'Validation error', details: err.details?.map(d=>d.message) }).code(400).takeover() },
        },
        handler: register,
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        options: {
          validate: { payload: loginSchema, failAction: (request, h, err) => h.response({ status: 'error', message: 'Validation error', details: err.details?.map(d=>d.message) }).code(400).takeover() },
        },
        handler: login,
      },
    ]);
  },
};