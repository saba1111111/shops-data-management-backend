import { PermissionTypes, Resources } from '../enums';

export type TFindPermissionCredentials =
  | {
      resource: Resources;
      type: PermissionTypes;
    }
  | { id: string };
