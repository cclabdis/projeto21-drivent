import { CreateTickets } from '@/protocols';
import Joi from 'joi';

export const createTicketsSchema = Joi.object<CreateTickets>({
    status: Joi.string().valid('RESERVED', 'PAID').required(),
    ticketTypeId: Joi.number().required(),
    enrollmentId: Joi.number().required(),
    TicketType: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        city: Joi.string().required(),
        price: Joi.number().required(),
        isRemote: Joi.boolean().required(),
        includesHotel: Joi.boolean().required(),
        createdAt: Joi.date().required(),
        UpdatedAt: Joi.date().required()
    }).required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
});
