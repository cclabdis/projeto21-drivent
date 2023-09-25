import { Payment } from '@prisma/client';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import { enrollmentRepository, paymentRepository, ticketsRepository } from '@/repositories';
import { PaymentRequest } from '@/protocols';

async function getPayment(userId: number, ticketId: number): Promise<Payment> {
  if (!ticketId) throw invalidDataError(`bad request`);
  const ticketType = await ticketsRepository.getTicketByIdForPayment(ticketId);
  if (!ticketType) throw notFoundError();

  const register = await enrollmentRepository.findWithAddressByUserId(userId);

  if (ticketType.enrollmentId !== register.id) throw unauthorizedError();

  const payment = await paymentRepository.findPayment(ticketId);
  if (!payment) throw unauthorizedError();
  return payment;
}

async function postPayment(userId: number, payment: PaymentRequest): Promise<Payment> {
  const ticket = await ticketsRepository.getTicketByIdForPayment(payment.ticketId);
  if (!ticket) throw notFoundError();

  const register = await ticketsRepository.findTicketPriceByUserId(userId);

  // if(ticket.enrollmentId !== userId) throw unauthorizedError()

  const authorizedPayment = await paymentRepository.createPayment(
    payment.cardData.issuer,
    payment.cardData.number.toString().slice(-4),
    register[0].TicketType.price,
    ticket.id,
  );

  await ticketsRepository.updateTicketStatus(payment.ticketId, 'PAID');

  return authorizedPayment;
}

export const paymentsService = {
  getPayment,
  postPayment,
};
