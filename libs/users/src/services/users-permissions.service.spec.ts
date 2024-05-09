import { Test, TestingModule } from '@nestjs/testing';
import { IUserPermissions, IUsersPermissionsRepository } from '../interfaces';
import { UsersPermissionsService } from './users-permissions.service';
import { USERS_PERMISSIONS_REPOSITORY_TOKEN } from '../constants';
import { MockingBaseItem } from 'libs/common/mocks';
import { UserPermissionsStatuses } from '../enums';
import { UserPermissionAlreadyExistException } from '../exceptions';
import { UsersService } from './users.service';
import { PermissionsService } from 'libs/permissions';

export const mockUsersPermissionsItem: IUserPermissions = Object.freeze({
  ...MockingBaseItem,
  status: UserPermissionsStatuses.ACTIVE,
  allow: true,
  userId: '1',
  permissionId: '1',
});

describe('UsersPermissionsService', () => {
  let service: UsersPermissionsService;
  let repository: IUsersPermissionsRepository;
  const usersService = {
    ensureUserExistsById: jest.fn(),
  };
  const permissionsService = {
    ensurePermissionExistsById: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersPermissionsService,
        {
          provide: USERS_PERMISSIONS_REPOSITORY_TOKEN,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: PermissionsService,
          useValue: permissionsService,
        },
      ],
    }).compile();

    service = module.get<UsersPermissionsService>(UsersPermissionsService);
    repository = module.get<IUsersPermissionsRepository>(
      USERS_PERMISSIONS_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkUserPermissionExistence method.', () => {
    const input = {
      userId: mockUsersPermissionsItem.userId,
      permissionId: mockUsersPermissionsItem.permissionId,
      allow: true,
    };

    it('should not throw an exception if user permission does not exist.', async () => {
      repository.findOne = jest.fn(() => Promise.resolve(null));

      await expect(
        service.checkUserPermissionExistence(input),
      ).resolves.toBeUndefined();
    });

    it('should throw an exception when user permission exist.', async () => {
      repository.findOne = jest.fn(() =>
        Promise.resolve(mockUsersPermissionsItem),
      );

      await expect(service.checkUserPermissionExistence(input)).rejects.toThrow(
        UserPermissionAlreadyExistException,
      );
    });
  });

  describe('createPermission method.', () => {
    it('It should Create Permission.', async () => {
      usersService.ensureUserExistsById.mockResolvedValue(undefined);
      permissionsService.ensurePermissionExistsById.mockResolvedValue(
        undefined,
      );
      repository.findOne = jest.fn(() => Promise.resolve(null));
      repository.create = jest.fn(() =>
        Promise.resolve(mockUsersPermissionsItem),
      );

      const input = {
        allow: mockUsersPermissionsItem.allow,
        userId: mockUsersPermissionsItem.userId,
        permissionId: mockUsersPermissionsItem.userId,
      };

      await expect(service.createPermission(input)).resolves.toEqual(
        mockUsersPermissionsItem,
      );
      expect(usersService.ensureUserExistsById).toHaveBeenCalledWith(
        input.userId,
      );
      expect(
        permissionsService.ensurePermissionExistsById,
      ).toHaveBeenCalledWith(input.permissionId);
      expect(repository.findOne).toHaveBeenCalledWith(input);
      expect(repository.create).toHaveBeenCalledWith(input);
    });
  });
});
