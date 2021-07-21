import { IOperator } from '@modules/operators/entity';

import { BaseRepositoryORM } from '@shared/base/repository/implementations/BaseRepositoryORM';

import { IOperatorsRepository } from '../IOperatorsRepository';

class OperatorsRepositoryORM
  extends BaseRepositoryORM<IOperator>
  implements IOperatorsRepository
{
  constructor() {
    super('operators');
  }

  async getByUsername(username: string): Promise<IOperator | undefined> {
    return this.repository.findOne<IOperator>(this.entityClass, { username });
  }

  async getByEmail(email: string): Promise<IOperator | undefined> {
    return this.repository.findOne<IOperator>(this.entityClass, { email });
  }
}

export { OperatorsRepositoryORM };
