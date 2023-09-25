import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketsSchema } from '@/schemas';
import { getTicket, getTicketsType } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsType )
    .get('/', getTicket)
    .post('/', validateBody(createTicketsSchema), );

export { ticketsRouter };
