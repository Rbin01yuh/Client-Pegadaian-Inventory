import Joi from 'joi';

export const transactionCreateSchema = Joi.object({
  product_id: Joi.number().integer().optional(),
  sku: Joi.string().max(100).empty('').optional(),
  type: Joi.string().lowercase().valid('in', 'out', 'incoming', 'outgoing').required(),
  quantity: Joi.number().integer().min(1).required(),
  total_price: Joi.number().precision(2).min(0).optional(),
  note: Joi.string().max(255).allow('').optional(),
  date: Joi.string().empty('').pattern(/^\d{4}-\d{2}-\d{2}$/).default(() => new Date().toISOString().slice(0, 10)),
}).or('product_id', 'sku');