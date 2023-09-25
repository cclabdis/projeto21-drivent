import { Payment } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';





async function getPayment(ticketId: number): Promise<Payment> {
    if (!ticketId) throw invalidDataError(`Ticket invalido`);

    // const register = await enrollmentRepository.findWithAddressByUserId(userId);
    // if (!register) throw notFoundError();

    // const ticketType = await ticketsRepository.getTicketById(register.id);
    // if (!ticketType) throw notFoundError();

    return ;
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

export const ticketsService = {
    // createProcess,
    getPayment
};
