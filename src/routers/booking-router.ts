import { getBookingById, postBooking, putBookingById } from '@/controllers/booking-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { Router } from 'express';


const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookingById)
  .post('/', postBooking)
  .put('/:bookingId', putBookingById)

export { bookingRouter };
