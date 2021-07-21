import { IBaseEntity } from '../entity';

export interface IBaseRepository<T extends IBaseEntity> {
  create(data: Partial<T>): Promise<T>;
  update(data: T): Promise<T>;
  remove(data: T): Promise<void>;
  getById(id: string, relations?: string[]): Promise<T | undefined>;
  getAll(): Promise<T[]>;
}
