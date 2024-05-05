import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from '../constants';
import { IUsersRepository } from '../interfaces';
import { TCreateUserCredentials, TUserAlreadyExistParameters } from '../types';
import { handleError } from 'libs/common/helpers';
import { UserAlreadyExistsException } from '../exceptions';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async create(input: TCreateUserCredentials) {
    try {
      await this.checkUserAlreadyExistence({
        status: input.status,
        phoneNumber: input.phoneNumber,
      });

      if (input.email) {
        await this.checkUserAlreadyExistence({
          status: input.status,
          email: input.email,
        });
      }

      // Hash password.
    } catch (error) {
      handleError(error);
    }
  }

  public async checkUserAlreadyExistence(
    input: TUserAlreadyExistParameters,
  ): Promise<void> {
    const user = await this.usersRepository.findOne(input);

    if (user) {
      throw new UserAlreadyExistsException(input);
    }
  }
}
