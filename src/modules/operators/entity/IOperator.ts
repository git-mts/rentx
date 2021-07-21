import { Role } from '@modules/operators/roles/entity';
import { IBaseEntity } from '@shared/base/entity';

export interface IOperator extends IBaseEntity {
  username: string;
  email?: string;
  role_id: string;
  role: Role;
  password: string;
  created_at: Date;
}
