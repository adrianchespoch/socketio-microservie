import { DomainError } from './domain-error.error';

export class InvalidArgumentError extends DomainError {
  constructor(public readonly errors: string[]) {
    super('One or more arguments are invalid');
  }
}
