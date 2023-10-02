import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findHotelById(ticketId: number) {
    const result = await prisma.payment.findFirst({
      where: { ticketId },
    });
    return result;
  }

  async function findHotel() {
    const result = await prisma.payment.findFirst({
    
    });
    return result;
  }