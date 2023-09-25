import { Response } from 'express';
import httpStatus from 'http-status';
import { ticketsService } from '@/services';
import { AuthenticatedRequest } from '@/middlewares';
import { TicketId } from '@/protocols';


export async function getPayment(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { ticketId } = req.body as TicketId
  const payment = await 
  res.status(httpStatus.OK).send(payment);
}

// export async function createProcess(req: AuthenticatedRequest, res: Response): Promise<void> {
 
//   const { userId } = req;
//   const process =  await
//   res.status(httpStatus.CREATED).send(process);
// }
