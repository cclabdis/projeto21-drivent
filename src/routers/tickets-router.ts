import { Router } from 'express';

// import { createUserSchema } from '@/schemas';
import { authenticateToken } from '@/middlewares';
// import { usersPost } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', )
    .get('/', )
    // .post('/', validateBody(), );

export { ticketsRouter };
