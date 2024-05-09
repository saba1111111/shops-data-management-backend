import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from 'libs/permissions';
import {
  MockPermissionsService,
  mockPermissionsData,
} from 'libs/permissions/mocks';
import { PermissionTypes, Resources } from 'libs/permissions/enums';
import {
  InsertPermissionDto,
  PaginationCredentialsDto,
} from 'libs/permissions/dtos';
import {
  PermissionAlreadyExistsException,
  PermissionNotFoundException,
} from 'libs/permissions/exceptions';
import { MockingDates } from 'libs/common/mocks';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let permissionService: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {
          provide: PermissionsService,
          useValue: MockPermissionsService,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    permissionService = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Permission Route', () => {
    it('should create a permission and return the created permission object.', async () => {
      const permissionData: InsertPermissionDto = {
        type: PermissionTypes.WRITE,
        resource: Resources.CUSTOMER_MESSAGES,
        description: 'desc',
      };
      const expectedResponse = {
        ...permissionData,
        id: expect.any(String),
        ...MockingDates,
      };

      expect(controller.createPermission(permissionData)).resolves.toEqual(
        expectedResponse,
      );
      expect(permissionService.createPermission).toHaveBeenCalledWith(
        permissionData,
      );
    });

    it('should fail to create a permission when input validation fails', async () => {
      const invalidPermissionData: InsertPermissionDto = {
        type: PermissionTypes.WRITE,
        resource: Resources.CUSTOMER_MESSAGES,
        description: '',
      };

      permissionService.createPermission = jest
        .fn()
        .mockRejectedValue(
          new PermissionAlreadyExistsException(
            invalidPermissionData.type,
            invalidPermissionData.resource,
          ),
        );

      await expect(
        controller.createPermission(invalidPermissionData),
      ).rejects.toThrow(PermissionAlreadyExistsException);

      expect(permissionService.createPermission).toHaveBeenCalledWith(
        invalidPermissionData,
      );
    });
  });

  describe('get permissions route.', () => {
    it('should return paginated permissions', async () => {
      const dto = new PaginationCredentialsDto();
      dto.page = 1;
      dto.itemsPerPage = 10;

      const result = await controller.paginatePermissions(dto);

      expect(result).toEqual({
        pageInfo: {
          currentPage: dto.page,
          totalPages: Math.ceil(mockPermissionsData.length / dto.itemsPerPage),
          itemsPerPage: dto.itemsPerPage,
        },
        items: mockPermissionsData,
      });

      expect(permissionService.getAll).toHaveBeenCalledWith(dto);
    });
  });

  describe('Update Permission Route.', () => {
    it('should update a permission and return the updated permission object.', async () => {
      const id = '1';
      const updateData = {
        type: PermissionTypes.READ,
        resource: Resources.CUSTOMER_MESSAGES,
        description: 'Updated description',
      };

      const expectedResponse = {
        id,
        ...updateData,
      };

      const result = await controller.updatePermission(id, updateData);

      expect(result).toEqual(expectedResponse);
      expect(permissionService.updateById).toHaveBeenCalledWith(id, updateData);
    });

    it('should throw an error when the update fails due to non-existent permission', async () => {
      const id = 'wrongId';
      const updateData = {
        type: PermissionTypes.WRITE,
      };

      permissionService.updateById = jest
        .fn()
        .mockRejectedValue(new PermissionNotFoundException());

      await expect(controller.updatePermission(id, updateData)).rejects.toThrow(
        PermissionNotFoundException,
      );
      expect(permissionService.updateById).toHaveBeenCalledWith(id, updateData);
    });
  });

  describe('deletePermission method', () => {
    it('should successfully delete a permission and return no content', async () => {
      const permissionId = '1';
      const response = await controller.deletePermission(permissionId);

      expect(response).toEqual(1);
      expect(permissionService.deleteById).toHaveBeenCalledWith(permissionId);
    });

    it('should throw an error when trying to delete a non-existent permission', async () => {
      const permissionId = 'wrongId';
      permissionService.deleteById = jest
        .fn()
        .mockRejectedValue(new PermissionNotFoundException());

      await expect(controller.deletePermission(permissionId)).rejects.toThrow(
        PermissionNotFoundException,
      );
      expect(permissionService.deleteById).toHaveBeenCalledWith(permissionId);
    });
  });
});
