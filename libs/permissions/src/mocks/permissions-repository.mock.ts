import {
  TCreatePermissionCredentials,
  TFindPermissionCredentials,
} from '../types';
import { MockingDates, mockPermissionsData } from './permissions-data.mocks';

export const MockPermissionsRepository = {
  findOne: jest.fn((criteria: TFindPermissionCredentials) => {
    if ('id' in criteria) {
      return Promise.resolve(
        mockPermissionsData.find((permission) => permission.id === criteria.id),
      );
    }
    return Promise.resolve(
      mockPermissionsData.find(
        (permission) =>
          permission.type === criteria.type &&
          permission.resource === criteria.resource,
      ),
    );
  }),
  create: jest.fn((input: TCreatePermissionCredentials) => {
    const newPermission = {
      ...input,
      id: `${mockPermissionsData.length + 1}`,
      ...MockingDates,
    };
    mockPermissionsData.push(newPermission);
    return Promise.resolve(newPermission);
  }),
};
