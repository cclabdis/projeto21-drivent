import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';


export async function getHotels(req: Request, res: Response) {



  return;
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.query.ticketId);
  const hotel = await hotelsService.findHotel(hotelId)
  return res.status(httpStatus.OK).send(hotel);
}