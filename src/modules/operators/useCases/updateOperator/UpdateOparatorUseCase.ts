import { autoInjectable, inject } from 'tsyringe';

import { IOperator } from '@modules/operators/entity';

import { IOperatorsRepository } from '@modules/operators/repository';

import { AppError } from '@shared/base/error/AppError';

import { IHashProvider } from '@shared/infra/container/providers/HashProvider';

interface IRequest {
  id: string;
  username: string;
  email?: string;
  password: string;
  role_id?: string;
}

@autoInjectable()
export class UpdateOperatorUseCase {
  private operatorsRepository!: IOperatorsRepository;

  private hashProvider!: IHashProvider;

  constructor(
    @inject('OperatorsRepository') operatorsRepository?: IOperatorsRepository,
    @inject('HashProvider') hashProvider?: IHashProvider,
  ) {
    if (hashProvider) this.hashProvider = hashProvider;
    if (operatorsRepository) this.operatorsRepository = operatorsRepository;
  }

  async execute({ id, username, email, password, role_id }: IRequest): Promise<IOperator> {
    const operator = await this.operatorsRepository.getById(id);

    if (!operator) throw new AppError('Operator not found!', 404);

    if (email && operator.email !== email) {
      const email_already_in_use = !!(await this.operatorsRepository.getByEmail(email));

      if (email_already_in_use) throw new AppError('user email already in use!', 409);
    }

    if (operator.username === 'admin') {
      if (operator.role_id !== role_id)
        throw new AppError('admin user cannot have the role changed!', 409);

      if (operator.username !== username)
        throw new AppError('admin user cannot have username changed!', 409);

      const encrypted_password = await this.hashProvider.generate(password);

      Object.assign(operator, { password: encrypted_password, email: email || null });
    } else {
      if (operator.username !== username) {
        const name_already_in_use = !!(await this.operatorsRepository.getByUsername(username));

        if (name_already_in_use) throw new AppError('username already in use!', 409);
      }

      const encrypted_password = await this.hashProvider.generate(password);

      Object.assign(operator, {
        username,
        email: email || null,
        role_id: role_id || null,
        password: encrypted_password,
      });
    }

    return this.operatorsRepository.update(operator);
  }
}
