import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from '../constants';
import {
  IUser,
  IUsersRepository,
  IdentifyUserCredentials,
} from '../interfaces';
import { TCreateUserCredentials } from '../types';
import { UserAlreadyExistsException } from '../exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async create(input: TCreateUserCredentials): Promise<IUser> {
    return this.usersRepository.create(input);
  }

  public async checkUserExistence(
    input: IdentifyUserCredentials,
  ): Promise<void> {
    const user = await this.usersRepository.findUser(input);

    if (user) {
      throw new UserAlreadyExistsException(input.type, input.phoneNumber);
    }
  }
}
