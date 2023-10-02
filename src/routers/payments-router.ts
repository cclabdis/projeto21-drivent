import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPaymentByTicketId, paymentProcess } from '@/controllers';

import { paymentSchema } from '@/schemas';

const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('/', getPaymentByTicketId)
  .post('/process', validateBody(paymentSchema), paymentProcess);
export { paymentRouter };
