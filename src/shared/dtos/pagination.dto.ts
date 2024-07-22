import { z } from 'zod';

import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '../infrastructure/utils';

export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(page: number = 1, limit: number = 10): Nullable<PaginationDto> {
    const validationResult = PaginationSchema.safeParse({ page, limit });

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const { page: validatedPage, limit: validatedLimit } =
      validationResult.data;
    return new PaginationDto(validatedPage, validatedLimit);
  }
}

export class PaginationResponseDto<T> {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly total: number,
    public readonly totalPages: number,
    public readonly data: T[]
  ) {}

  static create<T>(
    page: number,
    limit: number,
    total: number,
    data: T[]
  ): PaginationResponseDto<T> {
    const totalPages = Math.ceil(total / limit);
    return new PaginationResponseDto(page, limit, total, totalPages, data);
  }
}
