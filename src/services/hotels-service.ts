import { notFoundError, paymentRequiredError } from '@/errors';
import { enrollmentRepository, hotelRepository } from '@/repositories';

async function findHotels(userId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByIdUnique(userId);
  if (!reserved || !reserved.Ticket) throw notFoundError();
  if (reserved.Ticket.status !== 'PAID') throw paymentRequiredError('nao estao pagos');
  if (reserved.Ticket.TicketType.isRemote) throw paymentRequiredError('é remoto');
  if (!reserved.Ticket.TicketType.includesHotel) throw paymentRequiredError('nao tem hotel incluso');

  const hotels = await hotelRepository.findHotels();
  if (!hotels || hotels.length === 0) throw notFoundError();
  return hotels;
}

async function findHotelById(userId: number, hotelId: number) {
  const reserved = await enrollmentRepository.findEnrollmenteByIdUnique(userId);
  if (!reserved || !reserved.Ticket) throw notFoundError();
  if (reserved.Ticket.status !== 'PAID') throw paymentRequiredError('nao estao pagos');
  if (reserved.Ticket.TicketType.isRemote) throw paymentRequiredError('é remoto');
  if (!reserved.Ticket.TicketType.includesHotel) throw paymentRequiredError('nao tem hotel incluso');
  const hotel = await hotelRepository.findHotelById(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

export const hotelsService = {
  findHotelById,
  findHotels,
};
