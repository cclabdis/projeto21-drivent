import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ticketsService } from '@/services';


export async function getTicketsType(_req: Request, res: Response) {
  const tickets = await ticketsService.getTicketsType();
  return res.status(httpStatus.OK).send(tickets);
}
