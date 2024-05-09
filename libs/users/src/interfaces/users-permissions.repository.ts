import { IBaseRepository } from 'libs/common';
import { IUserPermissions } from './users-permissions.interface';
import {
  TCheckPermissionExistenceCredentials,
  TCreateUserPermissionCredentials,
} from '../types';

export interface IUsersPermissionsRepository
  extends IBaseRepository<IUserPermissions> {
  findOne(
    input: TCheckPermissionExistenceCredentials,
  ): Promise<IUserPermissions>;

  create(input: TCreateUserPermissionCredentials): Promise<IUserPermissions>;
}
