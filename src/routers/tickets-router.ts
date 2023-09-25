import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { create, getTicket, getTicketsType } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsType)
    .get('/', getTicket)
    .post('/', create);
export { ticketsRouter };
