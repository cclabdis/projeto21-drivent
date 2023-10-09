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
    const booking = await bookingService.postBooking(userId, roomId)

    return res.status(httpStatus.OK).send({ booking });
  }

  export async function putBookingById(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { roomId } = req.body;
    const bookingId = parseInt(req.params.bookingId);
    const booking = await bookingService.putBooking(userId, roomId, bookingId)

    res.status(httpStatus.OK).send({ booking });
  }

