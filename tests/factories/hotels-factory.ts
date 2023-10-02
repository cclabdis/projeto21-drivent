import faker from '@faker-js/faker';
import { Booking, Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';
import { func, string } from 'joi';

export function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      image: faker.image.imageUrl(),
      name: faker.company.companyName(),
      Rooms: {
        createMany: {
          data: [
            {
              capacity: faker.datatype.number({ min: 1, max: 4, precision: 1 }),
              name: faker.name.jobTitle()
            },
            {
              capacity: faker.datatype.number({ min: 1, max: 4, precision: 1 }),
              name: faker.name.jobTitle()
            }
          ]
        }
      }
    },
    include: {
      Rooms: true,
    }
  })
}

export function createBooking(user: number, room: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId: user,
      roomId: room,
    }
  })
}

export function createRoom( hotel: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.company.companyName(),
      capacity: faker.datatype.number({ min: 1, max: 4, precision: 1 }),
      hotelId: hotel,
    }
  })
}

export async function createMyTicketType(remote: boolean, hotel: boolean){
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: remote,
      includesHotel: hotel,
    },
  });
}
