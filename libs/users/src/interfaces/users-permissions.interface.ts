import { IBaseItem } from 'libs/common';
import { UserPermissionsStatuses } from '../enums';

export interface IUserPermissions extends IBaseItem {
  status: UserPermissionsStatuses;
  allow: boolean;
  userId: string;
  permissionId: string;
}
