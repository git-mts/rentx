import { container } from 'tsyringe';

import './providers';

import { IOperatorsRepository, OperatorsRepositoryORM } from '@modules/operators/repository';
import { IRolesRepository, RolesRepositoryORM } from '@modules/operators/roles/repository';

container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepositoryORM);
container.registerSingleton<IOperatorsRepository>(
  'OperatorsRepository',
  OperatorsRepositoryORM,
);
