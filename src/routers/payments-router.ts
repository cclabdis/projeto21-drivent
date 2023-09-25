import { Router } from 'express';
import { authenticateToken, validateBody} from '@/middlewares';
import { createProcess, getPayment } from '@/controllers';
import { createPaymentSchema } from '@/schemas';

const paymentRouter = Router();

paymentRouter
    .all('/*', authenticateToken)
    .get('/', getPayment)
    .post('/process', validateBody(createPaymentSchema) ,createProcess);
export { paymentRouter };
