import { Event } from '@prisma/client';
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import { eventRepository } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';

async function getBooking() {
  
  return ;
}
//Erros: usuário não tem reserva (booking) ⇒ status code 404 (Not Found).

async function postBooking() {
 
  return 
}

//  Regra de negócio: apenas usuários com ingresso do tipo presencial, com hospedagem e ingresso pago podem fazer reservas.
// 
// - `roomId` não existente ⇒ deve retornar status code `404 (Not Found)`.
// - `roomId` sem vaga ⇒ deve retornar status code `403 (Forbidden)`.
//     - Um quarto pode receber mais de um usuário, até o limite de sua capacidade.
//     - Para verificar quantas pessoas já estão em um quarto, você deve olhar pelas reservas (`bookings`).
// - Fora da regra de negócio ⇒ deve retornar status code `403 (Forbidden)`.

async function putBooking() {
 
    return 
  }
//   - A troca pode ser efetuada para usuários que possuem reservas.
//   - A troca pode ser efetuada apenas para quartos livres.

// - `roomId` não existente ⇒ deve retornar status code `404 (Not Found)`.
// - `roomId` sem reserva ⇒ deve retornar status code `403 (Forbidden)`.
// - `roomId` sem vaga no novo quarto ⇒ deve retornar status code `403 (Forbidden)`.
// - Fora da regra de negócio ⇒ deve retornar status code `403 (Forbidden)`.
export const bookingService = {
    getBooking,
    postBooking,
    putBooking
  
};
