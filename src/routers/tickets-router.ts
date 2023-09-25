import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
// import { createTicketsSchema } from '@/schemas';
import { create, getTicket, getTicketsType } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsType)
    .get('/', getTicket)
    .post('/', create);


    // , validateBody(createTicketsSchema),
export { ticketsRouter };
