import { PermissionTypes, Resources } from '../enums';
import { IPermission } from '../interfaces';

export const MockingDates = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockPermissionsData: IPermission[] = [
  {
    id: '1',
    resource: Resources.CUSTOMERS,
    type: PermissionTypes.READ,
    description: 'desc',
    ...MockingDates,
  },
];
