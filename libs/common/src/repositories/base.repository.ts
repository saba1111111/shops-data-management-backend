import { Model, Repository } from 'sequelize-typescript';
import {
  IBaseRepository,
  IPaginationProps,
  IPaginationResult,
  UpdateItemResponse,
} from '../interfaces';
import { IPermission } from 'libs/permissions/interfaces';
import { ModelAttributes } from 'sequelize';

export class BaseSequelizeRepository<Item, CreateItemAttrs>
  implements IBaseRepository<Item>
{
  constructor(protected readonly repository: Repository<Model>) {}

  public create(input: CreateItemAttrs): Promise<Item> {
    const credentials = input as ModelAttributes;
    return this.repository.create(credentials) as Promise<Item>;
  }

  public findById(id: string): Promise<Item> {
    return this.repository.findByPk(id) as Promise<Item>;
  }

  public async findAll(
    pagination: IPaginationProps,
    filters?: Partial<Item>,
  ): Promise<IPaginationResult<Item>> {
    const limit = pagination.itemsPerPage;
    const offset = (pagination.page - 1) * limit;
    const attributes = pagination?.fields || null;
    const order = pagination?.sort;

    const { rows, count } = await this.repository.findAndCountAll({
      offset,
      limit,
      ...(filters ? { where: filters } : {}),
      ...(attributes ? { attributes } : {}),
      ...(order ? { order } : {}),
    });

    const totalPages = Math.ceil(count / pagination.itemsPerPage);

    return {
      items: rows as Item[],
      pageInfo: {
        currentPage: pagination.page,
        totalPages,
        itemsPerPage: limit,
      },
    };
  }

  public async updateById(
    id: string,
    dto: Partial<IPermission>,
  ): Promise<UpdateItemResponse<Item>> {
    const [affectedCount] = await this.repository.update(dto, {
      where: { id },
    });

    if (affectedCount > 0) {
      const updatedItem = await this.findById(id);
      return { item: updatedItem, affectedCount };
    }

    return { item: null, affectedCount };
  }

  deleteById(id: string): Promise<number> {
    return this.repository.destroy({
      where: { id },
    });
  }
}
