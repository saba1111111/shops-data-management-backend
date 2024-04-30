import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { PERMISSIONS_REPOSITORY_TOKEN } from '../constants';
import { PermissionTypes, Resources } from '../enums';
import { PermissionAlreadyExistsException } from '../exceptions';
import {
  mockPermissionsData,
  MockingDates,
  MockPermissionsRepository,
} from '../mocks';

describe('PermissionsService', () => {
  let service: PermissionsService;

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
        id: `${mockPermissionsData.length}`,
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
});
