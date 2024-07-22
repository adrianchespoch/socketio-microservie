import { Router } from 'express';

import { diContainer } from '@/shared/infrastructure/config';
import { PlanificadorController } from '../controllers';

export class PlanificadorRoutes {
  static get routes(): Router {
    const router = Router();

    const planificadorController = diContainer.resolve<PlanificadorController>('planificadorController');

    router.post('/', (req, res) => planificadorController.create(req, res));
    router.get('/', (req, res) => planificadorController.findAll(req, res));
    router.get('/:id', (req, res) => planificadorController.findOne(req, res));
    router.patch('/:id', (req, res) => planificadorController.update(req, res));
    router.delete('/:id', (req, res) => planificadorController.delete(req, res));

    return router;
  }
}