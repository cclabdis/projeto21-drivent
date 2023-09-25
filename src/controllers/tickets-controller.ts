import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ticketsService } from '@/services';
import { AuthenticatedRequest } from '@/middlewares';

export async function getTicketsType( _req: Request, res: Response) {
  const tickets = await ticketsService.getTicketsType();
  return res.status(httpStatus.OK).send(tickets);
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const tickets = await ticketsService.getTickets(userId);
  return res.status(httpStatus.OK).send(tickets);
}