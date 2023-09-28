import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import { TicketAndType } from '@/protocols';

async function getTicketsType(): Promise<TicketType[]> {
  const tickets = await ticketsRepository.findMany();
  if (!tickets) throw notFoundError();
  return tickets;
}

async function getTickets(userId: number): Promise<Ticket> {
  const register = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!register) throw notFoundError();

  const ticket = await ticketsRepository.getTicketById(register.id);
  if (!ticket) throw notFoundError();

  return ticket;
}

async function create(ticketTypeId: number, userId: number): Promise<TicketAndType> {
  if (!ticketTypeId) throw invalidDataError(`Ticket invalido`);

  const register = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!register) throw notFoundError();

  const ticket = await ticketsRepository.getTicketById(register.id);
  if (ticket) throw notFoundError();

  return await ticketsRepository.createTicket({
    ticketTypeId,
    enrollmentId: register.id,
    status: TicketStatus.RESERVED,
  });
}

export const ticketsService = {
  create,
  getTicketsType,
  getTickets,
};
