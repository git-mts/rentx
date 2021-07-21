import { autoInjectable, inject } from 'tsyringe';

import { IPermission } from '@modules/operators/roles/entity';

import { IRolesRepository } from '@modules/operators/roles/repository/IRolesRepository';

@autoInjectable()
export class ListPermissionsUseCase {
  private rolesRepository!: IRolesRepository;

  constructor(@inject('RolesRepository') rolesRepository?: IRolesRepository) {
    if (rolesRepository) this.rolesRepository = rolesRepository;
  }

  async execute(): Promise<IPermission[]> {
    const permissions = await this.rolesRepository.getAllPermissions();

    return permissions;
  }
}
