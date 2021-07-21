import { IBaseEntity } from '@shared/base/entity';

export interface IPermission extends IBaseEntity {
  name: string;
  description: string;
  created_at: string;
}
