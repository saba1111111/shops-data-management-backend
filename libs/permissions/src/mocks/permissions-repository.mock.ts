import { IPaginationProps } from 'libs/common';
import {
  TCreatePermissionCredentials,
  TFindPermissionCredentials,
} from '../types';
import { mockPermissionsData } from './permissions-data.mocks';
import { randomBytes } from 'crypto';
import { IUpdatePermissionsCredentials } from '../interfaces';
import { MockingDates } from 'libs/common/mocks';

export const MockPermissionsRepository = {
  findOne: jest.fn((criteria: TFindPermissionCredentials) => {
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
      id: randomBytes(16).toString('hex'),
      ...input,
      ...MockingDates,
    };

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

  findById: jest.fn((id: string) => {
    return Promise.resolve(
      mockPermissionsData.find((permission) => permission.id === id),
    );
  }),

  updateById: jest.fn(
    (id: string, updateData: IUpdatePermissionsCredentials) => {
      return Promise.resolve({
        item: {
          id,
          ...updateData,
        },
        affectedCount: 1,
      });
    },
  ),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteById: jest.fn((id: string) => {
    return Promise.resolve(1);
  }),
};
