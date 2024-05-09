import { Test, TestingModule } from '@nestjs/testing';
import { UsersPermissionsController } from './users-permissions.controller';
import { mockUsersPermissionsItem } from 'libs/users/services/users-permissions.service.spec';
import { UsersPermissionsService } from 'libs/users/services';
import { UserPermissionAlreadyExistException } from 'libs/users/exceptions';

describe('UsersPermissionsController', () => {
  let controller: UsersPermissionsController;
  const usersPermissionsService = {
    createPermission: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPermissionsController],
      providers: [
        {
          provide: UsersPermissionsService,
          useValue: usersPermissionsService,
        },
      ],
    }).compile();

    controller = module.get<UsersPermissionsController>(
      UsersPermissionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create User Permission Route', () => {
    const input = {
      allow: mockUsersPermissionsItem.allow,
      userId: mockUsersPermissionsItem.userId,
      permissionId: mockUsersPermissionsItem.userId,
    };

    it('should create a user permission and return the created permission object.', async () => {
      usersPermissionsService.createPermission.mockResolvedValue(
        mockUsersPermissionsItem,
      );

      expect(controller.create(input)).resolves.toEqual(
        mockUsersPermissionsItem,
      );
      expect(usersPermissionsService.createPermission).toHaveBeenCalledWith(
        input,
      );
    });

    it('should fail to create a user permission when input validation fails', async () => {
      usersPermissionsService.createPermission = jest
        .fn()
        .mockRejectedValue(new UserPermissionAlreadyExistException());

      await expect(controller.create(input)).rejects.toThrow(
        UserPermissionAlreadyExistException,
      );

      expect(usersPermissionsService.createPermission).toHaveBeenCalledWith(
        input,
      );
    });
  });
});
