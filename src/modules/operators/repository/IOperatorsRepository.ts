import { IOperator } from '@modules/operators/entity';

import { IBaseRepository } from '@shared/base/repository/IBaseRepository';

export interface IOperatorsRepository extends IBaseRepository<IOperator> {
  getByUsername(username: string): Promise<IOperator | undefined>;
  getByEmail(email: string): Promise<IOperator | undefined>;
}
