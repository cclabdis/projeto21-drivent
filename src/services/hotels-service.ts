import { invalidDataError, notFoundError } from '@/errors';
import { hotelRepository } from '@/repositories';

async function findHotelById(hotelId: number) {
  if (!hotelId) throw invalidDataError('No hotel Id');

  const hotel = await hotelRepository.findHotelById(hotelId)
  if (!hotel) throw notFoundError();
  return hotel;
}

async function findHotels() {
  const hotels = await hotelRepository.findHotels()
  if (!hotels) throw notFoundError();
  return hotels;
}



export const hotelsService = {
  findHotelById,
  findHotels
}

