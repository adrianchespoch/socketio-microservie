import { CreatePlanificadorDto, UpdPlanificadorDto, PlanificadorDto } from '@/planificadores/dtos';
import { PaginationDto, PaginationResponseDto } from '@/shared/dtos';

export interface PlanificadorService {
  create(createDto: CreatePlanificadorDto): Promise<PlanificadorDto>;
  
  findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponseDto<PlanificadorDto>>;

  findOne(id: string): Promise<PlanificadorDto>;

  update(id: string, updDto: UpdPlanificadorDto): Promise<PlanificadorDto>;

  delete(id: string): Promise<void>;
}
