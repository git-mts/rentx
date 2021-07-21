import { IPermission, IRole } from '@modules/operators/roles/entity';

import { BaseRepositoryORM } from '@shared/base/repository/implementations/BaseRepositoryORM';

import { IRolesRepository } from '../IRolesRepository';

class RolesRepositoryORM extends BaseRepositoryORM<IRole> implements IRolesRepository {
  constructor() {
    super('roles');
  }

  getByName = async (name: string): Promise<IRole | undefined> =>
    this.repository.findOne<IRole>(this.entityClass, { name });

  getPermissionsByIds = async (ids: string[]): Promise<IPermission[]> =>
    this.repository.findByIds<IPermission>('permissions', ids);

  getPermissionsByRoleId = async (role_id: string): Promise<IPermission[]> => {
    const role = await this.repository.findOne<IRole>(this.entityClass, role_id, {
      relations: ['permissions'],
    });

    return role ? role.permissions : [];
  };

  getAllPermissions = async (): Promise<IPermission[]> =>
    this.repository.find<IPermission>('permissions');
}

export { RolesRepositoryORM };
