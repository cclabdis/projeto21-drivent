import { Ticket,  TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicket, TicketAndType, TicketFormat, enrolamentoId } from '@/protocols';


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

 async function findTicketPriceByUserId(userId: number): Promise<TicketFormat[]> | null {
    const tickets = await prisma.ticket.findMany({
      select: {
        id: true,
        status: true,
        ticketTypeId: true,
        enrollmentId: true,
        createdAt: true,
        updatedAt: true,
        TicketType: {
          select: {
            id: true,
            name: true,
            price: true,
            isRemote: true,
            includesHotel: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      where: {
        Enrollment: {
          userId,
        },
      },
    });
  
    if (!tickets || tickets.length == 0) {
      return null;
    }
  
    return tickets.map((ticket) => ({
      TicketType: {
        id: ticket.TicketType.id,
        name: ticket.TicketType.name,
        price: ticket.TicketType.price,
        isRemote: ticket.TicketType.isRemote,
        includesHotel: ticket.TicketType.includesHotel,
        createdAt: ticket.TicketType.createdAt,
        updatedAt: ticket.TicketType.updatedAt,
      }
    }));
  }

async function findTicketEnrolamentoByUserId(userId: number): Promise<enrolamentoId[]> | null {
  const tickets = await prisma.ticket.findMany({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      createdAt: true,
      updatedAt: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    where: {
      Enrollment: {
        userId,
      },
    },
  });

  if (!tickets || tickets.length == 0) {
    return null;
  }

  return tickets.map((ticket) => ({
    enrolamentoId: ticket.enrollmentId,
  }));
}
  
export const ticketsRepository = {
    createTicket,
    findMany,
    getTicketById,
    getTicketByIdForPayment,
    findTicketPriceByUserId,
    updateTicketStatus,
    findTicketEnrolamentoByUserId
};
