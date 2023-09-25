import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicket, TicketAndType } from '@/protocols';


async function findMany(): Promise<TicketType[]> {
    return prisma.ticketType.findMany()
}

async function getTicketById(id: number): Promise<Ticket> {
    const ticket = await prisma.ticket.findUnique({
        where: { enrollmentId: id },
        include: {
            TicketType: true,
        },
    });

    return ticket;
}

async function createTicket(ticket: CreateTicket): Promise<TicketAndType> {
    const newTicket = await prisma.ticket.create({
        data: ticket,
        include: {
            TicketType: true,
        },
    });

    return newTicket;
}

async function getTicketByIdForPayment(ticketId: number) {
    const ticket = await prisma.ticket.findFirst({
      where: { id: ticketId },
      include: {
        TicketType: true,
        Enrollment: true,
      },
    });
    return ticket;
  }

export const ticketsRepository = {
    createTicket,
    findMany,
    getTicketById,
    getTicketByIdForPayment
};
