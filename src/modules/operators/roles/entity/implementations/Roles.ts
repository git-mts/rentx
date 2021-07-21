import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntityORM } from '@shared/base/entity/implementations/BaseEntityORM';

import { IPermission } from '../IPermission';
import { IRole } from '../IRole';

@Entity('roles')
export class Role extends BaseEntityORM implements IRole {
  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToMany('permissions')
  @JoinTable({
    name: 'roles_permissions',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }],
  })
  permissions!: IPermission[];

  @Column()
  created_at!: string;
}
