import { MockingDates } from 'libs/common/mocks';
import { PermissionTypes, Resources } from '../enums';
import { IPermission } from '../interfaces';

export const mockPermissionsData: ReadonlyArray<Readonly<IPermission>> =
  Object.freeze([
    Object.freeze({
      id: '1',
      resource: Resources.CUSTOMERS,
      type: PermissionTypes.READ,
      description: 'desc1',
      ...MockingDates,
    }),
    Object.freeze({
      id: '2',
      resource: Resources.CUSTOMERS,
      type: PermissionTypes.WRITE,
      description: 'desc2',
      ...MockingDates,
    }),
  ]);
