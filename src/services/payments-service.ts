import { Payment } from '@prisma/client';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { paymentRepository, ticketsRepository } from '@/repositories';

async function getPayment(userId: number, ticketId: number): Promise<Payment> {
    if (!ticketId) throw invalidDataError(`Ticket id invalido`);

    const ticketType = await ticketsRepository.getTicketById(ticketId);
    if (!ticketType) throw unauthorizedError();

    if (ticketType.enrollmentId != userId) throw unauthorizedError();

    return await paymentRepository.findPayment(ticketId);
}

// async function createProcess(ticketTypeId: number, userId: number): Promise<TicketAndType> {
//     if (!ticketTypeId) throw invalidDataError(`Ticket invalido`);

//     const register = await enrollmentRepository.findWithAddressByUserId(userId);
//     if (!register) throw notFoundError();

//     const ticketType = await ticketsRepository.getTicketById(register.id);
//     if (ticketType) throw notFoundError();

//     return await ticketsRepository.createTicket({
//         ticketTypeId,
//         enrollmentId: register.id,
//         status: TicketStatus.RESERVED,
//     });
// }

export const paymentsService = {
    // createProcess,
    getPayment
};
