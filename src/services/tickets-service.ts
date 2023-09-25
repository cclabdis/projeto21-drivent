import { Ticket, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

async function getTicketsType(): Promise<TicketType[]> {
    const tickets = await ticketsRepository.findMany();
    if (!tickets) throw notFoundError();
    return tickets;
}

async function getTickets(userId: number): Promise<Ticket> {
    const register = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!register) throw notFoundError();

    const ticketType = await ticketsRepository.getTicketById(register.id);
    // if (!ticketType) throw notFoundError();

    return ticketType;
}


//   export type CreateTicket = Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt'>;
// export type CreateTickets = CreateEnrollmentParams & {
//     address: CreateAddressParams;
//   };
// export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

// async function isCurrentEventActive(): Promise<boolean> {
//   const event = await eventRepository.findFirst();
//   if (!event) return false;

//   const now = dayjs();
//   const eventStartsAt = dayjs(event.startsAt);
//   const eventEndsAt = dayjs(event.endsAt);

//   return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
// }

// export const eventsService = {
//   getFirstEvent,
//   isCurrentEventActive,
// };


export const ticketsService = {
    getTicketsType,
    getTickets
};
