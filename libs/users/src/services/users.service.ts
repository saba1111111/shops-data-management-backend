import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from '../constants';
import {
  IUser,
  IUsersRepository,
  IdentifyUserCredentials,
} from '../interfaces';
import { TCreateUserCredentials } from '../types';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../exceptions';
import { handleError } from 'libs/common/helpers';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async create(input: TCreateUserCredentials): Promise<IUser> {
    return this.usersRepository.create(input);
  }

  public async checkUserAlreadyExistence(
    input: IdentifyUserCredentials,
  ): Promise<void> {
    try {
      const user = await this.usersRepository.findUser(input);

      if (user) {
        throw new UserAlreadyExistsException(input.type, input.phoneNumber);
      }
    } catch (error) {
      handleError(error);
    }
  }

  public async ensureUserExistsById(userId: string): Promise<void> {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new UserNotFoundException(userId);
      }
    } catch (error) {
      handleError(error);
    }
  }
}
