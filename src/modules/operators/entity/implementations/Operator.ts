import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Role } from '@modules/operators/roles/entity';
import { BaseEntityORM } from '@shared/base/entity';

import { IOperator } from '../IOperator';

@Entity('operators')
export class Operator extends BaseEntityORM implements IOperator {
  @Column()
  username!: string;

  @Column('varchar')
  email?: string | undefined;

  @Column('uuid')
  role_id!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column()
  password!: string;

  @CreateDateColumn()
  created_at!: Date;
}
