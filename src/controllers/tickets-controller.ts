import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ticketsService } from '@/services';
import { AuthenticatedRequest } from '@/middlewares';
import { TicketTypeId } from '@/protocols';

export async function getTicketsType(_req: Request, res: Response): Promise<void> {
  const tickets = await ticketsService.getTicketsType();
  res.status(httpStatus.OK).send(tickets);
}

export async function getTicket(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { userId } = req;
  const tickets = await ticketsService.getTickets(userId);
  res.status(httpStatus.OK).send(tickets);
}

export async function create(req: AuthenticatedRequest, res: Response): Promise<void> {
  const { ticketTypeId } = req.body as TicketTypeId
  const { userId } = req;
  const ticketAndType = await ticketsService.create(ticketTypeId, userId);
  res.status(httpStatus.CREATED).send(ticketAndType);
}

