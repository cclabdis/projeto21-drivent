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

export type CreateTickets = {
  id: number;
  status: 'RESERVED' | 'PAID';
  ticketTypeId: number;
  enrollmentId: number;
  TicketType: {
    id: number;
    name: string;
    price: number;
    isRemote: boolean;
    includesHotel: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
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

export type cepFormat = Omit<ViaCepResponse, 'cep' | 'localidade' | 'ibge' | 'gia' | 'ddd' | 'siafi'> & {
  cidade: string;
};
