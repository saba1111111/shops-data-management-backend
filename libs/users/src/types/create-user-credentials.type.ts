import { IUser } from '../interfaces';

export type TCreateUserCredentials = Omit<
  IUser,
  'id' | 'createdAt' | 'updatedAt'
>;
