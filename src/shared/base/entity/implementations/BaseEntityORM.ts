import { PrimaryGeneratedColumn } from 'typeorm';

import { IBaseEntity } from '../IBaseEntity';

class BaseEntityORM implements IBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}

export { BaseEntityORM };
