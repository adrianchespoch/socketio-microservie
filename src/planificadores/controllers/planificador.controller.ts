import { Request, Response } from 'express';

import { PaginationDto } from '@/shared/dtos';

import { handleRestExceptions } from '@/shared/infrastructure/utils';
import { CreatePlanificadorDto, UpdPlanificadorDto } from '../dtos';
import { PlanificadorService } from '../services';

export class PlanificadorController {
  constructor(private readonly planificadorService: PlanificadorService) {}

  async create(req: Request, res: Response) {
    try {
      const createDto = CreatePlanificadorDto.create(req.body);
      const planificador = await this.planificadorService.create(createDto!);
      return res.status(201).json(planificador);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const paginationDto = PaginationDto.create(+page, +limit);
      const planificadors = await this.planificadorService.findAll(
        paginationDto!
      );

      return res.status(200).json(planificadors);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const planificador = await this.planificadorService.findOne(
        req.params.id
      );
      return res.status(200).json(planificador);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updDto = UpdPlanificadorDto.create(req.body);
      const planificador = await this.planificadorService.update(
        req.params.id,
        updDto!
      );
      return res.status(200).json(planificador);
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.planificadorService.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      handleRestExceptions(error, res);
    }
  }
}
