import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { PERMISSIONS_REPOSITORY_TOKEN } from '../constants';
import { PermissionTypes, Resources } from '../enums';
import {
  NoPermissionsDeletedException,
  PermissionAlreadyExistsException,
  PermissionNotFoundException,
} from '../exceptions';
import {
  mockPermissionsData,
  MockingDates,
  MockPermissionsRepository,
} from '../mocks';
import { IPermissionsRepository } from '../interfaces';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let repository: IPermissionsRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: PERMISSIONS_REPOSITORY_TOKEN,
          useValue: MockPermissionsRepository,
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    repository = module.get<IPermissionsRepository>(
      PERMISSIONS_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPermission method test.', () => {
    it('should create a new permission when no existing permission matches the criteria.', async () => {
      const permissionData = {
        type: PermissionTypes.READ,
        resource: Resources.CUSTOMER_MESSAGES,
      };
      const result = await service.createPermission(permissionData);

      expect(result).toEqual({
        id: expect.any(String),
        ...permissionData,
        ...MockingDates,
      });
    });

    it('should not create a new permission if a permission with the same credentials already exists in the database', async () => {
      const permissionData = {
        type: mockPermissionsData[0].type,
        resource: mockPermissionsData[0].resource,
      };

      await expect(service.createPermission(permissionData)).rejects.toThrow(
        PermissionAlreadyExistsException,
      );
    });
  });

  describe('paginate permissions method test.', () => {
    it('It should fetch permissions.', async () => {
      const { page, itemsPerPage } = { page: 1, itemsPerPage: 5 };
      const result = await service.getAll({ page, itemsPerPage });
      const totalPages = Math.ceil(mockPermissionsData.length / itemsPerPage);

      expect(result).toEqual({
        items: mockPermissionsData,
        pageInfo: {
          currentPage: page,
          totalPages,
          itemsPerPage,
        },
      });
    });
  });

  describe('find permission method test.', () => {
    it('should return the correct permission object when given a valid id', async () => {
      const permissionId = mockPermissionsData[0].id;
      const permission = await service.findById(permissionId);

      expect(permission).toEqual(mockPermissionsData[0]);
    });

    it('should throw a PermissionNotFoundException when given an invalid id', async () => {
      const permissionId = 'wrongId';

      await expect(service.findById(permissionId)).rejects.toThrow(
        PermissionNotFoundException,
      );
    });
  });

  describe('update permission method test.', () => {
    it('permission should update successfully.', async () => {
      const permission = mockPermissionsData[0];
      const permissionData = {
        type: PermissionTypes.READ,
        resource: Resources.CUSTOMER_MESSAGES,
      };
      const result = await service.updateById(permission.id, permissionData);

      expect(result).toEqual({
        id: expect.any(String),
        ...permissionData,
      });
    });

    it('Should not update permission, provided wrong id.', async () => {
      const permissionId = 'wrongId';
      const permissionData = {
        type: PermissionTypes.READ,
        resource: Resources.CUSTOMER_MESSAGES,
      };

      await expect(
        service.updateById(permissionId, permissionData),
      ).rejects.toThrow(PermissionNotFoundException);
    });

    it('should not update a permission if a permission with the same credentials already exists in the database.', async () => {
      const firstPermission = mockPermissionsData[0];
      const secondPermission = mockPermissionsData[1];
      const permissionData = {
        type: secondPermission.type,
        resource: secondPermission.resource,
      };

      await expect(
        service.updateById(firstPermission.id, permissionData),
      ).rejects.toThrow(PermissionAlreadyExistsException);
    });
  });

  describe('deleteById method.', () => {
    it('should call the delete method on the repository with the correct ID', async () => {
      const permissionId = mockPermissionsData[0].id;
      await service.deleteById(permissionId);

      expect(repository.deleteById).toHaveBeenCalledWith(permissionId);
    });

    it('should successfully delete a permission and return the count of deleted records', async () => {
      const permission = mockPermissionsData[0];
      const result = await service.deleteById(permission.id);

      expect(result).toEqual(1);
    });

    it('should throw a PermissionNotFoundException if no permission exists with the provided ID', async () => {
      const permissionId = 'wrongId';

      await expect(service.deleteById(permissionId)).rejects.toThrow(
        PermissionNotFoundException,
      );
    });

    it('should throw a NoPermissionsDeletedException if no permissions were deleted', async () => {
      const permission = mockPermissionsData[0];
      repository.deleteById = jest.fn(() => Promise.resolve(0));

      await expect(service.deleteById(permission.id)).rejects.toThrow(
        NoPermissionsDeletedException,
      );
    });
  });
});
