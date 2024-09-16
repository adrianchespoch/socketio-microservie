import { DomainError } from './domain-error.error';

export class GenericError extends DomainError {
  constructor(public readonly message: string, public readonly code: number) {
    super(message);
  }
}
