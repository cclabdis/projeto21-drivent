import { TicketStatus } from '@prisma/client';

import { notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

import { bookingRepository } from '@/repositories/booking-repository';
import { forbiddenError } from '@/errors/forbidden-error';


async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId)
  if (!booking) throw notFoundError()

  return booking;
}


async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId)
  if (!enrollment) throw forbiddenError("Sem inscrição");

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw forbiddenError("Sem ticket");

  if (ticket.status !== TicketStatus.PAID) throw forbiddenError("Nao esta pago");
  if (ticket.TicketType.isRemote) throw forbiddenError("É remoto");
  if (!ticket.TicketType.includesHotel) throw forbiddenError("Hotel não incluso");
    
  

  const room = await bookingRepository.check(roomId)
  if (!room) throw forbiddenError("O quarto nao existe")
  if (room.capacity <= room.Booking.length) throw forbiddenError("Hotel sem capacidade ou quartos livres")

  const { id } = await bookingRepository.createBooking(userId, roomId)

  return id
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  const user = await bookingRepository.findBooking(userId)
  if (!user || user.id !== bookingId) throw forbiddenError("Sem reversa no hotel")

  const room = await bookingRepository.check(roomId)
  if (!room) throw notFoundError();
  if (room.capacity <= room.Booking.length) throw forbiddenError("Hotel sem capacidade ou quartos livres")

  const { id } = await bookingRepository.bookingUpdate(bookingId, roomId)

  return id
}

export const bookingService = {
  getBooking,
  postBooking,
  putBooking

};
