import { ApplicationError } from '@/protocols';

export function invalidDataError(details: string): ApplicationError {
  return {
    name: 'InvalidDataError',
    message: `Invalid data: ${details}`,
  };
}


export function paymentRequiredError(message: string = 'payment required'): ApplicationError {
  return {
    name: 'PaymentRequired',
    message
  };
};