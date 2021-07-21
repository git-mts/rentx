import { autoInjectable, inject } from 'tsyringe';

import { IRole } from '@modules/operators/roles/entity';

import { IRolesRepository } from '@modules/operators/roles/repository';

import { AppError } from '@shared/base/error/AppError';

interface IRequest {
  name: string;
  description: string;
  permissionsId: string[];
}

@autoInjectable()
export class CreateRoleUseCase {
  private rolesRepository!: IRolesRepository;

  constructor(@inject('RolesRepository') rolesRepository?: IRolesRepository) {
    if (rolesRepository) this.rolesRepository = rolesRepository;
  }

  async execute({ description, name, permissionsId }: IRequest): Promise<IRole> {
    const name_already_in_use = !!(await this.rolesRepository.getByName(name));

    if (name_already_in_use) throw new AppError('name already in use!', 409);

    const permissions = await this.rolesRepository.getPermissionsByIds(permissionsId);

    return this.rolesRepository.create({ name, description, permissions });
  }
}
