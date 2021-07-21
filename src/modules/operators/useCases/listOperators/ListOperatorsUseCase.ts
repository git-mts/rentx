import { autoInjectable, inject } from 'tsyringe';

import { Operator } from '@modules/operators/entity';

import { IOperatorsRepository } from '@modules/operators/repository';

@autoInjectable()
export class ListOperatorsUseCase {
  private operatorsRepository!: IOperatorsRepository;

  constructor(@inject('OperatorsRepository') operatorsRepository?: IOperatorsRepository) {
    if (operatorsRepository) this.operatorsRepository = operatorsRepository;
  }

  async execute(): Promise<Operator[]> {
    return this.operatorsRepository.getAll();
  }
}
