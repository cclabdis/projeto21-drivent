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

async function updateTicketStatus(ticketId: number, status: 'RESERVED' | 'PAID'): Promise<void> {
    await prisma.ticket.update({
      where: { 
        id: ticketId 
    },
      data: { 
        status
    },
    });
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

  async function findTicketPriceByUserId(userId: number): Promise<number | null> {
    const ticket = await prisma.ticket.findUnique({
      where: { enrollmentId: userId },
      select: {
        TicketType: {
          select: {
            price: true,
          },
        },
      },
    });
  
    if (!ticket || !ticket.TicketType || typeof ticket.TicketType.price !== 'number') {
      return null;
    }
  
    return ticket.TicketType.price;
  }

export const ticketsRepository = {
    createTicket,
    findMany,
    getTicketById,
    getTicketByIdForPayment,
    findTicketPriceByUserId
};
