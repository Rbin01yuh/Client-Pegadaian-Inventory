import Joi from 'joi';

export const supplierCreateSchema = Joi.object({
  name: Joi.string().max(150).required(),
  contact: Joi.string().max(100).empty('').default('N/A'),
  address: Joi.string().max(255).empty('').default('N/A'),
});

export const supplierUpdateSchema = Joi.object({
  name: Joi.string().max(150).optional(),
  contact: Joi.string().max(100).empty('').optional(),
  address: Joi.string().max(255).empty('').optional(),
});