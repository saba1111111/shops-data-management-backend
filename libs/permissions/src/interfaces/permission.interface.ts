import { IBaseItem } from 'libs/common';
import { PermissionTypes, Resources } from '../enums';

export interface IPermission extends IBaseItem {
  description?: string;
  resource: Resources;
  type: PermissionTypes;
}
