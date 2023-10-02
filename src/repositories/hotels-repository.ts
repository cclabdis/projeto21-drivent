import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function findHotelById(hotelId: number): Promise<Hotel> {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true}
  });
  return result;
}

// async function findHotels(): Promise<Hotel> {
//   return await prisma.hotel.findMany({

//   });
// }

export const hotelRepository = {
  // findHotels,
  findHotelById
}