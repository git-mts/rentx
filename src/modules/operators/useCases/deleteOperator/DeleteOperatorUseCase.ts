import { autoInjectable, inject } from 'tsyringe';

import { IOperatorsRepository } from '@modules/operators/repository';

import { AppError } from '@shared/base/error/AppError';

@autoInjectable()
export class DeleteOperatorUseCase {
  private operatorsRepository!: IOperatorsRepository;

  constructor(@inject('OperatorsRepository') operatorsRepository?: IOperatorsRepository) {
    if (operatorsRepository) this.operatorsRepository = operatorsRepository;
  }

  async execute(id: string): Promise<void> {
    const operator = await this.operatorsRepository.getById(id);

    if (!operator) throw new AppError('Operator not found!', 404);

    if (operator.username === 'admin')
      throw new AppError('admin user cannot be deleted!', 409);

    await this.operatorsRepository.remove(operator);
  }
}
