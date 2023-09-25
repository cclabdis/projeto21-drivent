import { Router } from 'express';
import { authenticateToken} from '@/middlewares';
import { getPayment } from '@/controllers';

const paymentRouter = Router();

paymentRouter
    .all('/*', authenticateToken)
    .get('/', getPayment)
    // .post('/process', createProcess);
export { paymentRouter };
