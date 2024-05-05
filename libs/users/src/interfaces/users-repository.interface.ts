import { TCreateUserCredentials } from '../types';
import { IUser } from './users.interface';
import { IBaseRepository } from 'libs/common';

export interface IUsersRepository extends IBaseRepository<IUser> {
  create(input: TCreateUserCredentials): Promise<IUser>;
  findUser(input: Partial<IUser>): Promise<IUser>;
}
