import { InvalidArgumentError, Nullable } from '@/shared/domain';
import { handleDtoValidation } from '@/shared/infrastructure/utils';
import { CreatePlanificadorSchema } from './create-planificador.dto';

const UpdPlanificadorSchema = CreatePlanificadorSchema.partial();

export class UpdPlanificadorDto {
  private constructor(
  ) {}

  static create(props: Record<string, any>): Nullable<UpdPlanificadorDto> {
    const validationResult = UpdPlanificadorSchema.safeParse(props);

    if (!validationResult.success) {
      const errors = handleDtoValidation(validationResult.error.issues);
      throw new InvalidArgumentError(errors);
    }

    const {  } = validationResult.data;
    return new UpdPlanificadorDto();
  }
}