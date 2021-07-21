import { IPermission, IRole } from '@modules/operators/roles/entity';

import { BaseRepositoryORM } from '@shared/base/repository/implementations/BaseRepositoryORM';

export interface IRolesRepository extends BaseRepositoryORM<IRole> {
  getByName(name: string): Promise<IRole | undefined>;
  getPermissionsByIds(ids: string[]): Promise<IPermission[]>;
  getPermissionsByRoleId(role_id: string): Promise<IPermission[]>;
  getAllPermissions(): Promise<IPermission[]>;
}
