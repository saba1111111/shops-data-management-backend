import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from 'libs/permissions';
import { MockPermissionsService } from 'libs/permissions/mocks';
import { PermissionTypes, Resources } from 'libs/permissions/enums';
import { MockingDates } from 'libs/permissions/mocks';
import { CreatePermissionDto } from 'libs/permissions/dtos';
import { PermissionAlreadyExistsException } from 'libs/permissions/exceptions';

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
      const permissionData: CreatePermissionDto = {
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
      const invalidPermissionData: CreatePermissionDto = {
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
});
