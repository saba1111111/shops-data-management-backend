import { IUser } from '../interfaces';

export type TFindUserCredentials = Partial<
  Pick<IUser, 'status' | 'phoneNumber'>
>;
