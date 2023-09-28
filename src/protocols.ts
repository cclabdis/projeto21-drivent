import { Ticket, TicketType, Payment } from '@prisma/client';


export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Cep = {
  cep: string;
};

export type TicketTypeId = {
  ticketTypeId: number;
};
export type TicketId = {
  ticketId: number;
};

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export type CEP = {
  cep: string;
};
