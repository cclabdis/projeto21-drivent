import { Payment } from '@prisma/client';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { enrollmentRepository, paymentRepository, ticketsRepository } from '@/repositories';

async function getPayment(userId: number, ticketId: number): Promise<Payment> {
    if (!ticketId ) throw invalidDataError(`bad request`);
    // if( ticketId === null || isNaN(ticketId) ) throw notFoundError();

    const ticketType = await ticketsRepository.getTicketByIdForPayment(ticketId);
    if (!ticketType) throw notFoundError() //linha 68 do test
   

    const register = await enrollmentRepository.findWithAddressByUserId(userId);
   
    if (ticketType.enrollmentId !== register.id) throw unauthorizedError();

    const payment = await paymentRepository.findPayment(ticketId);
    if(!payment) throw unauthorizedError()
    return payment;
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
