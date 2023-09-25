import { Payment,  User } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicket, TicketAndType } from '@/protocols';


async function findPayment(ticketId: number): Promise<Payment> {
    return await prisma.payment.findUnique({ where: { ticketId: ticketId } });
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



export const paymentRepository = {
    createTicket,
    findPayment
};
