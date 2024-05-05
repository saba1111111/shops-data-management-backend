import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY_TOKEN } from '../constants';
import { IUsersRepository, IdentifyUserCredentials } from '../interfaces';
import { TCreateUserCredentials } from '../types';
import { handleError } from 'libs/common/helpers';
import { UserAlreadyExistsException } from '../exceptions';
import { HASH_SERVICE_TOKEN } from 'libs/utils/constants';
import { IHashService } from 'libs/utils/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly usersRepository: IUsersRepository,
    @Inject(HASH_SERVICE_TOKEN) private readonly hashService: IHashService,
  ) {}

  public async create(input: TCreateUserCredentials) {
    try {
      await this.isUserRegisteredWithContactInfo({
        status: input.status,
        phoneNumber: input.phoneNumber,
        email: input.email,
      });

      const hashedPassword = await this.hashService.hash(input.password);

      return this.usersRepository.create({
        ...input,
        password: hashedPassword,
      });
    } catch (error) {
      handleError(error);
    }
  }

  private async isUserRegisteredWithContactInfo(
    input: IdentifyUserCredentials,
  ): Promise<void> {
    const { status, phoneNumber, email } = input;

    const user =
      await this.usersRepository.isUserRegisteredWithContactInfo(input);

    if (user) {
      const emailExist = email && email === user.email;
      const phoneNumberExist = phoneNumber && phoneNumber === user.phoneNumber;

      throw new UserAlreadyExistsException({
        status,
        ...(emailExist ? { email } : {}),
        ...(phoneNumberExist ? { phoneNumber } : {}),
      });
    }
  }
}
