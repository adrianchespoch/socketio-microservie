import { CreatePlanificadorDto, UpdPlanificadorDto, PlanificadorDto } from '@/planificadores/dtos';
import { PlanificadorService } from './planificador.service';
import { PlanificadorModel } from '../models';
import { PaginationDto, PaginationResponseDto } from '@/shared/dtos';
import { ResourceNotFoundError } from '@/shared/domain';


export class PlanificadorServiceImpl implements PlanificadorService {

  constructor(private readonly planificadorModel: typeof PlanificadorModel) {}

  async create(createDto: CreatePlanificadorDto): Promise<PlanificadorDto> {
    const planificador = await this.planificadorModel.create(createDto);

    return PlanificadorDto.create(planificador!);
  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<PaginationResponseDto<PlanificadorDto>> {
    const { page, limit } = paginationDto;
    const [total, planificadors] = await Promise.all([
      this.planificadorModel.countDocuments(),
      this.planificadorModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    return PaginationResponseDto.create<PlanificadorDto>(
      page,
      limit,
      total,
      planificadors.map(PlanificadorDto.create)
    );
  }

  async findOne(id: string): Promise<PlanificadorDto> {
    const planificador = await this.findOneById(id);
    if (!planificador) throw new ResourceNotFoundError('Planificador not found');
    return PlanificadorDto.create(planificador);
  }

  async update(id: string, updDto: UpdPlanificadorDto): Promise<PlanificadorDto> {
    const planificador = await this.planificadorModel.findByIdAndUpdate(id, updDto, { new: true });
    if (!planificador) throw new ResourceNotFoundError('Planificador not found');

    return PlanificadorDto.create(planificador);
  }

  async delete(id: string): Promise<void> {
    const res = await this.planificadorModel.findByIdAndDelete(id);
    if (!res) throw new ResourceNotFoundError('Planificador not found');
  }

  private async findOneById(id: string): Promise<any> {
    return this.planificadorModel.findById(id) || null;
  }
}
