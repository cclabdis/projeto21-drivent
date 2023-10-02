import { invalidDataError, notFoundError, paymentRequiredError } from '@/errors';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';

async function findHotels(userId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByIdUnique(userId)
  if (!reserved || !reserved.Ticket) throw notFoundError()
  if (reserved.Ticket.status !== 'PAID') throw { name: "PaymentRequired", message: "Ticket doesn't include hotel" }
  if (reserved.Ticket.TicketType.isRemote) throw { name: "PaymentRequired", message: "Ticket doesn't include hotel" }
  if (!reserved.Ticket.TicketType.includesHotel) throw { name: "PaymentRequired", message: "Ticket doesn't include hotel" }

  const hotels = await hotelRepository.findHotels()
  if (!hotels || hotels.length === 0) throw notFoundError();
  return hotels;
}

async function findHotelById(userId: number, hotelId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByIdUnique(userId)
  if (!reserved || !reserved.Ticket) throw notFoundError()
  if (reserved.Ticket.status === 'PAID') throw { name: "PaymentRequired", message: "Ticket doesn't include hotel" }
  if (reserved.Ticket.TicketType.isRemote) throw { name: "PaymentRequired", message: "Ticket doesn't include hotel" }
  if (!reserved.Ticket.TicketType.includesHotel) throw { name: "PaymentRequired", message: "Ticket doesn't include hotel" }
  const hotel = await hotelRepository.findHotelById(hotelId)
  if (!hotel) throw notFoundError()

}


export const hotelsService = {
  findHotelById,
  findHotels
}

