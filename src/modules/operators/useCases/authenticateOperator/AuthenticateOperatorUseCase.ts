import { sign } from 'jsonwebtoken';
import { autoInjectable, inject } from 'tsyringe';

import { IOperatorsRepository } from '@modules/operators/repository';
import { IRolesRepository } from '@modules/operators/roles/repository';

import { AppError } from '@shared/base/error/AppError';

import { IHashProvider } from '@shared/infra/container/providers/HashProvider';

interface IRequest {
  username: string;
  password: string;
}

@autoInjectable()
export class AuthenticateOperatorUseCase {
  private operatorsRepository!: IOperatorsRepository;

  private rolesRepository!: IRolesRepository;

  private hashProvider!: IHashProvider;

  constructor(
    @inject('OperatorsRepository') operatorsRepository?: IOperatorsRepository,
    @inject('RolesRepository') rolesRepository?: IRolesRepository,
    @inject('HashProvider') hashProvider?: IHashProvider,
  ) {
    if (operatorsRepository) this.operatorsRepository = operatorsRepository;
    if (hashProvider) this.hashProvider = hashProvider;
    if (rolesRepository) this.rolesRepository = rolesRepository;
  }

  async execute({ username, password }: IRequest): Promise<string> {
    const operator = await this.operatorsRepository.getByUsername(username);

    if (!operator) throw new AppError('username and/or password invalid!', 401);

    const matchedPassword = await this.hashProvider.compare(operator.password, password);

    if (!matchedPassword) throw new AppError('username and/or password invalid!', 401);

    const permissions = await this.rolesRepository.getPermissionsByRoleId(operator.role_id);

    const token = sign({ permissions }, 'secret-key', {
      subject: operator.id,
      expiresIn: '5m',
    });

    return token;
  }
}
