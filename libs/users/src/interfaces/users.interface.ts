import { IBaseItem } from 'libs/common';
import { UserStatuses } from '../enums';

export interface IUser extends IBaseItem {
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  email?: string;
  status: UserStatuses;
  information?: string;
}
