import { prisma } from '@/config';
import { Booking } from '@prisma/client';

async function findBooking(bookingId: number) {
  return prisma.booking.findFirst({
    where:{
        id: bookingId
    },
    include: {
        Room: true
    }
  });
}

async function createBooking(roomId: number, params: Booking) {
    const result = await prisma.booking.create({
      data: {
        roomId,
        ...params
      },
    });
  
    return result;
  }


  async function bookingUpdate(roomId: number) {
    const result = prisma.booking.update({
      where: {
        
      },
      data: {
        
      },
    });
  
    return result;
  }
export const hotelRepository = {
  findBooking,
  createBooking,
  bookingUpdate
};
