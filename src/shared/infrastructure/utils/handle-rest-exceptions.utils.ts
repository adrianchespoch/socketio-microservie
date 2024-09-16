import { Response } from 'express';
import mongoose from 'mongoose';

import {
  BadRequestError,
  DomainError,
  GenericError,
  InvalidArgumentError,
  ResourceNotFoundError,
} from '@/shared/domain';

export const handleRestExceptions = (error: any, res: Response) => {
  console.log('\nerror\n', error, '\n');

  if (error instanceof DomainError) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ errors: [error.message] });
    } else if (error instanceof InvalidArgumentError) {
      return res.status(400).json({ errors: error.errors });
    } else if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ errors: [error.message] });
    } else if (error instanceof GenericError) {
      return res.status(error.code).json({ errors: [error.message] });
    } else {
      return res.status(500).json({ errors: [error.message] });
    }
  }

  // handle wrong ID mongo format
  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .json({ errors: [`Invalid ID format: ${error.value}`] });
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ errors: error.errors });
  }

  console.log('\nerror\n', error, '\n');
  return res.status(500).json({ error: 'Internal server error' });
};
