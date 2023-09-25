import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';


async function findMany(): Promise<TicketType[]> {
    return prisma.ticketType.findMany()
}

export const ticketsRepository = {
    findMany,
    getTicketById
};


// async function create(ticket: CreateTicket): Promise<TicketAndType> {
//     const ticketAndType = await prisma.ticket.create({
//       data: ticket,
//       include: {
//         TicketType: true,
//       },
//     });

//     return ticketAndType;
//   }

async function getTicketById(id: number): Promise<Ticket> {
    const ticket = await prisma.ticket.findUnique({
        where: { enrollmentId: id },
        include: {
            TicketType: true,
        },
    });

    return ticket;
}