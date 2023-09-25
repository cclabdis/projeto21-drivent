import Joi from 'joi';
import { PaymentRequest } from '@/protocols';

export const createPaymentSchema = Joi.object<PaymentRequest>({
    ticketId: Joi.number().required(),
	cardData: Joi.object({
		issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.date().required(),
        cvv: Joi.string().required(),
	}).required(),
});
