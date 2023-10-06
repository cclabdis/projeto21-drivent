import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { enrollmentsService } from '@/services';

export async function getBookingById(req: AuthenticatedRequest, res: Response) {
  
  return res.status(httpStatus.OK).send(); //retornar {	"id": bookingId,"Room": {// dados do quarto}}
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
    // "roomId": Number body da requisição
  
  return res.status(httpStatus.OK).send(); //retornar o bookingId
}

export async function putBookingById(req: AuthenticatedRequest, res: Response) {

   // "roomId": Number body da requisição


  
  res.status(httpStatus.OK).send(); //{	"bookingId": Number}
}
