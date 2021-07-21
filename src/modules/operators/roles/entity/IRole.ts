import { IBaseEntity } from '@shared/base/entity';

import { IPermission } from './IPermission';

export interface IRole extends IBaseEntity {
  name: string;
  description: string;
  permissions: IPermission[];
  created_at: string;
}
