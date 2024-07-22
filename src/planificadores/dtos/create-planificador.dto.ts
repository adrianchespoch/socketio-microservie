import { z } from 'zod';

import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '@/shared/infrastructure/utils';

export const CreatePlanificadorSchema = z.object({});


export class CreatePlanificadorDto {
  private constructor(
  ) {}

  static create(props: Record<string, any>): Nullable<CreatePlanificadorDto> {
    const validationResult = CreatePlanificadorSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const {  } = validationResult.data;
    return new CreatePlanificadorDto();
  }
}