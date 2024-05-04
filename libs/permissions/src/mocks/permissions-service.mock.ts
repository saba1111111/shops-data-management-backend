import { IPaginationProps } from 'libs/common';
import { TCreatePermissionCredentials } from '../types';
import { MockingDates } from './permissions-data.mocks';
import { MockPermissionsRepository } from './permissions-repository.mock';
import { UpdatePermissionDto } from '../dtos';

export const MockPermissionsService = {
  createPermission: jest.fn((input: TCreatePermissionCredentials) => {
    return Promise.resolve({ ...input, id: '1', ...MockingDates });
  }),
  getAll: jest.fn((input: IPaginationProps) => {
    return Promise.resolve(MockPermissionsRepository.findAll(input));
  }),
  updateById: jest.fn((id: string, input: UpdatePermissionDto) => {
    return Promise.resolve({ ...input, id });
  }),
};
