import { Test, TestingModule } from '@nestjs/testing';
import { IUsersRepository } from '../interfaces';
import { UsersService } from './users.service';
import { USERS_REPOSITORY_TOKEN } from '../constants';
import { MockUser } from '../mocks';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../exceptions';
import { UnexpectedErrorException } from 'libs/common/exceptions';

describe('UsersService', () => {
  let service: UsersService;
  let repository: IUsersRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY_TOKEN,
          useValue: {
            findUser: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<IUsersRepository>(USERS_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create user method.', () => {
    it('should create user.', async () => {
      const user = {
        name: MockUser.name,
        surname: MockUser.surname,
        phoneNumber: MockUser.phoneNumber,
        password: MockUser.password,
        type: MockUser.type,
        status: MockUser.status,
      };

      repository.create = jest.fn(() => Promise.resolve(MockUser));

      const result = await service.create(user);

      expect(result).toEqual({
        ...MockUser,
        ...user,
      });
    });
  });

  describe('check if user already exist method.', () => {
    it('should not throw an exception if user does not exist.', async () => {
      const input = { type: MockUser.type, phoneNumber: MockUser.phoneNumber };
      repository.findUser = jest.fn(() => Promise.resolve(null));

      await expect(
        service.checkUserAlreadyExistence(input),
      ).resolves.toBeUndefined();
    });

    it('should throw an exception when user exist.', async () => {
      const input = { type: MockUser.type, phoneNumber: MockUser.phoneNumber };
      repository.findUser = jest.fn(() => Promise.resolve(MockUser));

      await expect(service.checkUserAlreadyExistence(input)).rejects.toThrow(
        UserAlreadyExistsException,
      );
    });
  });

  describe('ensure user exists By id method.', () => {
    it('should not return any value when user exists by ID', async () => {
      const userId = MockUser.id;
      repository.findById = jest.fn(() => Promise.resolve(MockUser));

      await expect(
        service.ensureUserExistsById(userId),
      ).resolves.toBeUndefined();
    });

    it('should throw error when user not exists by ID.', async () => {
      const userId = MockUser.id;
      repository.findById = jest.fn(() => Promise.resolve(null));

      await expect(service.ensureUserExistsById(userId)).rejects.toThrow(
        UserNotFoundException,
      );
    });

    it('throws an UnexpectedErrorException when user ID is in the wrong format', async () => {
      const userId = 'userIdInWrongFormat';

      repository.findById = jest.fn(() =>
        Promise.reject('Id field is in wrong format.'),
      );

      await expect(service.ensureUserExistsById(userId)).rejects.toThrow(
        UnexpectedErrorException,
      );
    });
  });
});
