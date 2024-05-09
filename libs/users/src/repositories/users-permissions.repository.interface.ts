import { Injectable } from '@nestjs/common';
import { BaseSequelizeRepository } from 'libs/common/repositories';
import { IUserPermissions } from '../interfaces';
import {
  TCheckPermissionExistenceCredentials,
  TCreateUserPermissionCredentials,
} from '../types';
import { InjectModel } from '@nestjs/sequelize';
import { UsersPermissionsModel } from '../models';
import { Repository } from 'sequelize-typescript';
import { IUsersPermissionsRepository } from '../interfaces/users-permissions.repository';

@Injectable()
export class UsersPermissionsSequelizeRepository
  extends BaseSequelizeRepository<
    IUserPermissions,
    TCreateUserPermissionCredentials
  >
  implements IUsersPermissionsRepository
{
  constructor(
    @InjectModel(UsersPermissionsModel)
    protected readonly repository: Repository<UsersPermissionsModel>,
  ) {
    super(repository);
  }

  public create(
    input: TCreateUserPermissionCredentials,
  ): Promise<IUserPermissions> {
    return this.repository.create(input);
  }

  public findOne(input: TCheckPermissionExistenceCredentials) {
    return this.repository.findOne({ where: input });
  }
}
