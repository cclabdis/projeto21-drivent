import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';


export async function getHotels(req: Request, res: Response) {
  const hotels = await hotelsService.findHotels()
  return res.status(httpStatus.OK).send(hotels);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = Number(req.query.hotelId);
  const hotel = await hotelsService.findHotelById(hotelId)
  return res.status(httpStatus.OK).send(hotel);
}