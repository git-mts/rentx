import { autoInjectable, inject } from 'tsyringe';

import { IRole } from '@modules/operators/roles/entity';

import { IRolesRepository } from '@modules/operators/roles/repository';

import { AppError } from '@shared/base/error/AppError';

interface IRequest {
  id: string;
  name: string;
  description: string;
  permissionsId: string[];
}

@autoInjectable()
export class UpdateRoleUseCase {
  private rolesRepository!: IRolesRepository;

  constructor(@inject('RolesRepository') rolesRepository?: IRolesRepository) {
    if (rolesRepository) this.rolesRepository = rolesRepository;
  }

  async execute({ id, description, name, permissionsId }: IRequest): Promise<IRole> {
    const role = await this.rolesRepository.getById(id);

    if (!role) throw new AppError('Role not found!', 404);

    if (role.name === 'admin') throw new AppError('admin role cannot be updated', 409);

    const name_already_in_use =
      role.name !== name && !!(await this.rolesRepository.getByName(name));

    if (name_already_in_use) throw new AppError('name already in use!', 409);

    const permissions = await this.rolesRepository.getPermissionsByIds(permissionsId);

    Object.assign(role, { name, description, permissions });

    return this.rolesRepository.update(role);
  }
}
