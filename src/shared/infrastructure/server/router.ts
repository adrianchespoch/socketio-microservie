import { Router } from 'express';

import { PlanificadorRoutes } from '@/planificadores/routes';


export class AppRouter {

  static get routes(): Router {
    const router = Router();

    router.use('/api/planificadores', PlanificadorRoutes.routes);

    return router;
  }

}
