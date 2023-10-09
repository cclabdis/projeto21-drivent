import { prisma } from '@/config';
import { Booking } from '@prisma/client';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where:{
        userId,
    },
    include: {
        Room: true
    }
  });
}

async function createBooking(userId: number, roomId: number) {
    const result = await prisma.booking.create({
      data: {
        userId,
        roomId
      },
      include: {
        Room: true
      }
    });
  
    return result;
  }

  async function check(roomId: number){
    return prisma.room.findUnique({
      where: { 
        id: roomId 
      },
    include: { 
      Booking: true 
    },
    })
  }

  async function bookingUpdate(bookingId: number, roomId: number) {
    const result = prisma.booking.update({
      where: { 
        id: bookingId        
      },
      data: {
        roomId
      },
      include: {
        Room: true
      }
    });
  
    return result;
  }

  
export const bookingRepository = {
  check,
  findBooking,
  createBooking,
  bookingUpdate
};
