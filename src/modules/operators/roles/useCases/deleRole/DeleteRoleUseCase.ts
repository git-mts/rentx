import { autoInjectable, inject } from 'tsyringe';

import { IRolesRepository } from '@modules/operators/roles/repository';

import { AppError } from '@shared/base/error/AppError';

@autoInjectable()
export class DeleteRoleUseCase {
  private rolesRepository!: IRolesRepository;

  constructor(@inject('RolesRepository') rolesRepository?: IRolesRepository) {
    if (rolesRepository) this.rolesRepository = rolesRepository;
  }

  async execute(id: string): Promise<void> {
    const role = await this.rolesRepository.getById(id);

    if (!role) throw new AppError('Role not found!', 404);

    if (role.name === 'admin') throw new AppError('admin role cannot be deleted', 409);

    await this.rolesRepository.remove(role);
  }
}
