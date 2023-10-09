import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services/booking-service';

export async function getBookingById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const booking = await bookingService.getBooking(userId)

  return res.status(httpStatus.OK).send(booking);
}

  export async function postBooking(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;
    const bookingId = await bookingService.postBooking(userId, roomId)

    return res.status(httpStatus.OK).send({ bookingId });
  }

  export async function putBookingById(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;
    const bookingIdParams = parseInt(req.params.bookingId);
    const bookingId = await bookingService.putBooking(userId, roomId, bookingIdParams)

    res.status(httpStatus.OK).send({ bookingId });
  }

