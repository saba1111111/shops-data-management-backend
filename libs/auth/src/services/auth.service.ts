import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'libs/common/helpers';
import { IRegisterUserCredentials } from '../interfaces';
import { UsersService } from 'libs/users';
import { HASH_SERVICE_TOKEN } from 'libs/utils/constants';
import { IHashService } from 'libs/utils/interfaces';
import { UserStatuses } from 'libs/users/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    @Inject(HASH_SERVICE_TOKEN) private readonly hashService: IHashService,
  ) {}

  public async register(input: IRegisterUserCredentials) {
    try {
      await this.userService.checkUserExistence({
        type: input.type,
        phoneNumber: input.phoneNumber,
      });

      const hashedPassword = await this.hashService.hash(input.password);

      return this.userService.create({
        ...input,
        password: hashedPassword,
        status: UserStatuses.ACTIVE,
      });
    } catch (error) {
      handleError(error);
    }
  }
}
