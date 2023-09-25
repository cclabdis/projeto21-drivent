import { Response } from 'express';
import httpStatus from 'http-status';
import { paymentsService} from '@/services';
import { AuthenticatedRequest } from '@/middlewares';


export async function getPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
  const ticketId  = Number(req.query.ticketId );
  const { userId }  = req;

  const payment = await paymentsService.getPayment(userId, ticketId);
  res.status(httpStatus.OK).send(payment);
}

// export async function createProcess(req: AuthenticatedRequest, res: Response): Promise<void> {
 
//   const { userId } = req;
//   const process =  await paymentsService.
//   res.status(httpStatus.CREATED).send(process);
// }
