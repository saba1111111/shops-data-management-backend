import { IBaseRepository } from 'libs/common';
import { IPermission } from './permission.interface';
import { TCreatePermissionCredentials } from '../types/create-permission-credentials.type';
import { TFindPermissionCredentials } from '../types';

export interface IPermissionsRepository extends IBaseRepository<IPermission> {
  create(input: TCreatePermissionCredentials): Promise<IPermission>;
  findOne(input: TFindPermissionCredentials): Promise<IPermission>;
}
