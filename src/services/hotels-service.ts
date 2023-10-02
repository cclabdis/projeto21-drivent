import { invalidDataError, notFoundError, paymentRequiredError } from '@/errors';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

async function findHotels(userId: number) {

  const reserved = await enrollmentRepository.findEnrollmenteByID(userId)
  if (!reserved) throw notFoundError()
  const ticketByReserved = await ticketsRepository.findTicketByEnrollmentId(reserved.id)
  if (!ticketByReserved) throw notFoundError()
  if (ticketByReserved.status === 'RESERVED' || ticketByReserved.TicketType.isRemote || !ticketByReserved.TicketType.includesHotel) throw paymentRequiredError()


  const hotels = await hotelRepository.findHotels()
  if (!hotels) throw notFoundError();
  return hotels;
}

async function findHotelById(userId: number, hotelId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByID(userId)
  if (!reserved) throw notFoundError()
  const ticketByReserved = await ticketsRepository.findTicketByEnrollmentId(reserved.id)
  if (!ticketByReserved) throw notFoundError()
  if (ticketByReserved.status === 'RESERVED' || ticketByReserved.TicketType.isRemote || !ticketByReserved.TicketType.includesHotel) throw paymentRequiredError()



  const hotel = await hotelRepository.findHotelById(hotelId)
  if (!hotel) throw notFoundError();
  return hotel;
}


export const hotelsService = {
  findHotelById,
  findHotels
}

