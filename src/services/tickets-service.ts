import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import { ticketsRepository } from '@/repositories';

async function getTicketsType(): Promise<TicketType[]> {
    const tickets = await ticketsRepository.findMany();
    if (!tickets) throw notFoundError();
    return tickets;
}


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
    getTicketsType
};
