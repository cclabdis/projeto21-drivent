import { invalidDataError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import { hotelsService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';


export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const hotels = await hotelsService.findHotels(userId)
  return res.status(httpStatus.OK).send(hotels);
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = parseInt(req.params.hotelId) as number;
  if(isNaN(Number(hotelId)) || !Number.isInteger(Number(hotelId))) throw invalidDataError("params hotelId")
  const { userId } = req;
  const hotel = await hotelsService.findHotelById(userId, hotelId)
  return res.status(httpStatus.OK).send(hotel);
}