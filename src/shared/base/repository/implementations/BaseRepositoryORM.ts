import { EntityManager, getManager } from 'typeorm';

import { IBaseEntity } from '@shared/base/entity';

import { IBaseRepository } from '../IBaseRepository';

class BaseRepositoryORM<T extends IBaseEntity> implements IBaseRepository<T> {
  protected repository: EntityManager;

  protected entityClass: string;

  constructor(entityClass: string) {
    this.entityClass = entityClass;
    this.repository = getManager();
  }

  async create(data: Partial<T>): Promise<T> {
    const entity = this.repository.create<T>(this.entityClass);

    Object.assign(entity, data);

    return this.repository.save<T>(entity);
  }

  async update(data: T): Promise<T> {
    return this.repository.save<T>(data);
  }

  async remove(data: T): Promise<void> {
    this.repository.remove<T>(data);
  }

  async getById(id: string, relations?: string[]): Promise<T | undefined> {
    return this.repository.findOne<T>(this.entityClass, id, relations && { relations });
  }

  async getAll(): Promise<T[]> {
    return this.repository.find<T>(this.entityClass);
  }
}

export { BaseRepositoryORM };
