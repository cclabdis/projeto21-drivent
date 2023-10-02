import { invalidDataError, notFoundError } from '@/errors';
import { hotelRepository } from '@/repositories';

async function findHotel(hotelId: number) {
  if (!hotelId) throw invalidDataError('ticketTypeId');

  const hotel = await hotelRepository.findHotelById(hotelId)
  if (!hotel) throw notFoundError();
  return hotel;
}


export const hotelsService = {
  findHotel
}

