import { IUserPermissions } from '../interfaces';

export type TCreateUserPermissionCredentials = Omit<
  IUserPermissions,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>;
