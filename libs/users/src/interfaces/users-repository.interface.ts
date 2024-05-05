import { TCreateUserCredentials } from '../types';
import { TFindUserCredentials } from '../types/find-user-credentials.type';
import { IUser } from './users.interface';
import { IBaseRepository } from 'libs/common';

export interface IUsersRepository extends IBaseRepository<IUser> {
  create(input: TCreateUserCredentials): Promise<IUser>;
  findOne(input: TFindUserCredentials): Promise<IUser>;
}
