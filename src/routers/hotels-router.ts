import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';


const hotelsRouter = Router();

hotelsRouter
    .all('/*', authenticateToken)
    .get('/:hotelId',)   
    .get('/',)


export { hotelsRouter };

