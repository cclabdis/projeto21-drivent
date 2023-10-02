import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function findHotels() {
  return await prisma.hotel.findMany();
}

async function findHotelById(hotelId: number): Promise<Hotel> {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { Rooms: true },
  });
  return result;
}

async function findHotel(hotelId: number): Promise<Hotel> {
  const result = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });
  return result;
}

export const hotelRepository = {
  findHotels,
  findHotelById,
};
