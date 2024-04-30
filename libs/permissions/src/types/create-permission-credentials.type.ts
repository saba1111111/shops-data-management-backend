import { IPermission } from '../interfaces';

export type TCreatePermissionCredentials = Omit<
  IPermission,
  'id' | 'createdAt' | 'updatedAt'
>;
