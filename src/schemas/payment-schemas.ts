import Joi from 'joi';
import { PaymentRequest } from '@/protocols';

export const createPaymentSchema = Joi.object<PaymentRequest>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().required(),
  }).required(),
});
