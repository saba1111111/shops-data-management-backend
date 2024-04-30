import { Injectable } from '@nestjs/common';
import { IPermission, IPermissionsRepository } from '../interfaces';
import { Repository } from 'sequelize-typescript';
import { PermissionModel } from '../models';
import { BaseSequelizeRepository } from 'libs/common/repositories';
import {
  TCreatePermissionCredentials,
  TFindPermissionCredentials,
} from '../types';
import { WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PermissionsSequelizeRepository
  extends BaseSequelizeRepository<IPermission, TCreatePermissionCredentials>
  implements IPermissionsRepository
{
  constructor(
    @InjectModel(PermissionModel)
    protected readonly repository: Repository<PermissionModel>,
  ) {
    super(repository);
  }

  public findOne(input: TFindPermissionCredentials): Promise<IPermission> {
    const where: WhereOptions<IPermission> = {
      ...input,
    };
    return this.repository.findOne({ where });
  }
}
