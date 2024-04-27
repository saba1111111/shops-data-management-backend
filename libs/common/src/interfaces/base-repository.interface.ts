import { IPaginationProps } from './pagination-props.interface';
import { IPaginationResult } from './pagination-result.interface';

export interface IBaseRepository<M> {
  findById(id: string): Promise<M>;
  findAll(
    pagination?: IPaginationProps,
    filters?: Partial<M>,
  ): Promise<IPaginationResult<M>>;
  updateById(id: string, dto: Partial<M>): Promise<M>;
  deleteById(id: string): Promise<number>;
}
