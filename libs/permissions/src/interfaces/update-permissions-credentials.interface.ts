import { PermissionTypes, Resources } from '../enums';

export interface IUpdatePermissionsCredentials {
  type?: PermissionTypes;
  resource?: Resources;
  description?: string;
}
