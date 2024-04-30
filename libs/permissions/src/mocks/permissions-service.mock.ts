import { TCreatePermissionCredentials } from '../types';
import { MockingDates } from './permissions-data.mocks';

export const MockPermissionsService = {
  createPermission: jest.fn((input: TCreatePermissionCredentials) => {
    return Promise.resolve({ ...input, id: '1', ...MockingDates });
  }),
};
