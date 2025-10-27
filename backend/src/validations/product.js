import Joi from 'joi';

export const productCreateSchema = Joi.object({
  name: Joi.string().max(200).optional(),
  sku: Joi.string().max(100).optional(),
  category: Joi.string().max(100).empty('').default('Umum'),
  stock: Joi.number().integer().min(0).default(0),
  supplier_id: Joi.number().integer().optional(),
  buy_price: Joi.number().precision(2).min(0).default(0),
  sell_price: Joi.number().precision(2).min(0).default(0),
  image_url: Joi.string().max(255).allow(''),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().max(200).optional(),
  sku: Joi.string().max(100).optional(),
  category: Joi.string().max(100).empty('').optional(),
  stock: Joi.number().integer().min(0).optional(),
  supplier_id: Joi.number().integer().optional(),
  buy_price: Joi.number().precision(2).min(0).optional(),
  sell_price: Joi.number().precision(2).min(0).optional(),
  image_url: Joi.string().max(255).allow(''),
});