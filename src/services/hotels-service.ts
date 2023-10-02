import { invalidDataError, notFoundError, paymentRequiredError } from '@/errors';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

async function findHotels(userId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByIdUnique(userId)
  if (!reserved || !reserved.Ticket) throw notFoundError()
  if (reserved.Ticket.status === 'RESERVED' || reserved.Ticket.TicketType.isRemote || !reserved.Ticket.TicketType.includesHotel) throw paymentRequiredError()

  const hotels = await hotelRepository.findHotels()
  if (!hotels || hotels.length === 0) throw notFoundError();
  return hotels;
}

async function findHotelById(userId: number, hotelId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByIdUnique(userId)
  if (!reserved || !reserved.Ticket) throw notFoundError()
  if (reserved.Ticket.status === 'RESERVED' || reserved.Ticket.TicketType.isRemote || !reserved.Ticket.TicketType.includesHotel) throw paymentRequiredError()

  const hotel = await hotelRepository.findHotelById(hotelId)
  if (!hotel) throw notFoundError()

}


export const hotelsService = {
  findHotelById,
  findHotels
}

