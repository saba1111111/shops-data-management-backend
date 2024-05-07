import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'libs/common/helpers';
import { IRegisterWorkerUserCredentials } from '../interfaces';
import { UsersService } from 'libs/users';
import { HASH_SERVICE_TOKEN } from 'libs/utils/constants';
import { IHashService } from 'libs/utils/interfaces';
import { UserStatuses, UserTypes } from 'libs/users/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject(HASH_SERVICE_TOKEN) private readonly hashService: IHashService,
  ) {}

  public async registerWorkerUser(input: IRegisterWorkerUserCredentials) {
    const { user, permissions } = input;

    try {
      const userType = UserTypes.WORKER;
      await this.userService.checkUserExistence({
        type: userType,
        phoneNumber: user.phoneNumber,
      });

      if (permissions) {
        //
      }

      const hashedPassword = await this.hashService.hash(user.password);

      return this.userService.create({
        ...user,
        type: userType,
        password: hashedPassword,
        status: UserStatuses.ACTIVE,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
