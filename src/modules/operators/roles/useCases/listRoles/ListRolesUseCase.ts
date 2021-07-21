import { autoInjectable, inject } from 'tsyringe';

import { IRole } from '@modules/operators/roles/entity';

import { IRolesRepository } from '@modules/operators/roles/repository/IRolesRepository';

@autoInjectable()
export class ListRolesUseCase {
  private rolesRepository!: IRolesRepository;

  constructor(@inject('RolesRepository') rolesRepository?: IRolesRepository) {
    if (rolesRepository) this.rolesRepository = rolesRepository;
  }

  async execute(): Promise<IRole[]> {
    const roles = await this.rolesRepository.getAll();

    return roles;
  }
}
