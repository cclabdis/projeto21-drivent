import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findPayment(ticketId: number): Promise<Payment> {
    return await prisma.payment.findUnique({ 
        where: { 
            ticketId
        } 
    });
}

async function createPayment(cardIssuer: string, cardLastDigits: string, value: number, ticketId: number,): Promise<Payment> {
    return await prisma.payment.create({
      data: {
        cardIssuer,
        cardLastDigits,
        value,
        ticketId,
      }
    });
  }
  

export const paymentRepository = {
    findPayment,
    createPayment
};
