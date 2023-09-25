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
  ticketTypeId: number
}
export type TicketId = {
  ticketId: number
}

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

export type PaymentRequest= {
  ticketId: number;
  cardData: {
    issuer: string;
    number: string;
    name: string;
    expirationDate: string;
    cvv: string;
  };
};
export type TicketFormat = {
  TicketType: TicketType
};

export type enrolamentoId = {
  enrolamentoId: Number
} 

export type cepFormat = Omit<ViaCepResponse, 'cep' | 'localidade' | 'ibge' | 'gia' | 'ddd' | 'siafi'> & {
  cidade: string;
};

export type TicketAndType = Ticket & { TicketType: TicketType };

export type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;
