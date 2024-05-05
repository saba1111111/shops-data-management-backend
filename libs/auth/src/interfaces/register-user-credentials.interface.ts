import { UserTypes } from 'libs/users/enums';

export interface IRegisterUserCredentials {
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  type: UserTypes;
  information?: string;
}
