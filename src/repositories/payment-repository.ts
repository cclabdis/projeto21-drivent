import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findPayment(ticketId: number): Promise<Payment> {
    return await prisma.payment.findUnique({ 
        where: { 
            ticketId
        } 
    });
}

export const paymentRepository = {
    findPayment
};
