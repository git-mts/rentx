import { autoInjectable, inject } from 'tsyringe';

import { IOperator } from '@modules/operators/entity';

import { IOperatorsRepository } from '@modules/operators/repository';

import { AppError } from '@shared/base/error/AppError';

import { IHashProvider } from '@shared/infra/container/providers/HashProvider';

interface IRequest {
  username: string;
  email?: string;
  password: string;
  role_id: string;
}

@autoInjectable()
export class CreateOperatorUseCase {
  private operatorsRepository!: IOperatorsRepository;

  private hashProvider!: IHashProvider;

  constructor(
    @inject('OperatorsRepository') operatorsRepository?: IOperatorsRepository,
    @inject('HashProvider') hashProvider?: IHashProvider,
  ) {
    if (hashProvider) this.hashProvider = hashProvider;
    if (operatorsRepository) this.operatorsRepository = operatorsRepository;
  }

  async execute({ username, email, password, role_id }: IRequest): Promise<IOperator> {
    const name_already_in_use = !!(await this.operatorsRepository.getByUsername(username));

    if (name_already_in_use) throw new AppError('username already in use!', 409);

    if (email) {
      const email_already_in_use = !!(await this.operatorsRepository.getByEmail(email));

      if (email_already_in_use) throw new AppError('user email already in use!', 409);
    }

    const encrypted_password = await this.hashProvider.generate(password);

    return this.operatorsRepository.create({
      username,
      email,
      password: encrypted_password,
      role_id,
    });
  }
}
