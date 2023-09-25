import { Router } from 'express';

// import { createUserSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketsSchema } from '@/schemas';
import { getTicketsType } from '@/controllers/tickets-controller';
// import { usersPost } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsType )
    .get('/', )
    .post('/', validateBody(createTicketsSchema), );

export { ticketsRouter };
