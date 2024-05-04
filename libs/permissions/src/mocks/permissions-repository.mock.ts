import { IPaginationProps } from 'libs/common';
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

  findAll: jest.fn((input: IPaginationProps) => {
    const limit = input.itemsPerPage;
    const offset = (input.page - 1) * limit;

    const items = mockPermissionsData.slice(offset, offset + limit);

    const totalPages = Math.ceil(
      mockPermissionsData.length / input.itemsPerPage,
    );

    return {
      items,
      pageInfo: {
        currentPage: input.page,
        totalPages,
        itemsPerPage: limit,
      },
    };
  }),
};
