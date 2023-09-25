import { Payment } from '@prisma/client';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { enrollmentRepository, paymentRepository, ticketsRepository } from '@/repositories';
import { PaymentRequest } from '@/protocols';

async function getPayment(userId: number, ticketId: number): Promise<Payment> {
    if (!ticketId) throw invalidDataError(`bad request`);
    const ticketType = await ticketsRepository.getTicketByIdForPayment(ticketId);
    if (!ticketType) throw notFoundError()

    const register = await enrollmentRepository.findWithAddressByUserId(userId);

    if (ticketType.enrollmentId !== register.id) throw unauthorizedError();

    const payment = await paymentRepository.findPayment(ticketId);
    if (!payment) throw unauthorizedError()
    return payment;
}

async function postPayment(userId: number, payment: PaymentRequest): Promise<Payment> {
    if (!userId) throw unauthorizedError()

    const ticketType = await ticketsRepository.getTicketByIdForPayment(payment.ticketId);
    if (!ticketType) throw notFoundError()

    if (ticketType.id !== userId) throw unauthorizedError();

    const register = await ticketsRepository.findTicketPriceByUserId(userId);

    // const cardIssuer = 
    // const cardLastDigits = 
    // const value = register
    // const { ticketId } = payment

    const authorizedPayment = await paymentRepository.createPayment(
        payment.cardData.issuer,
        payment.cardData.number.slice(-4),
        register[0].TicketType.price,
        ticketType.id

    )

    await ticketsRepository.updateTicketStatus(payment.ticketId, 'PAID');

    return authorizedPayment;
}

export const paymentsService = {
    getPayment,
    postPayment
};
