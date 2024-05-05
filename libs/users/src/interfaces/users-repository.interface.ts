import { TCreateUserCredentials } from '../types';
import { IdentifyUserCredentials } from './identify-user-credentials.interface';
import { IUser } from './users.interface';
import { IBaseRepository } from 'libs/common';

export interface IUsersRepository extends IBaseRepository<IUser> {
  create(input: TCreateUserCredentials): Promise<IUser>;
  isUserRegisteredWithContactInfo(
    input: IdentifyUserCredentials,
  ): Promise<IUser>;
}
