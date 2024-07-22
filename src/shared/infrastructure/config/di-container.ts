import { InjectionMode, asClass, asValue, createContainer } from 'awilix';

import { PlanificadorController } from '@/planificadores/controllers';
import { PlanificadorModel } from '@/planificadores/models';
import { PlanificadorServiceImpl } from '@/planificadores/services';
// imports-end

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container
  .register({
    planificadorModel: asValue(PlanificadorModel),
    // models-end
  })
  .register({
    planificadorService: asClass(PlanificadorServiceImpl),
    // services-end
  })
  .register({
    planificadorController: asClass(PlanificadorController),
    // controllers-end
  });

export { container as diContainer };
