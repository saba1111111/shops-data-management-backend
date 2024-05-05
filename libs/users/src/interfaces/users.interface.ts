import { IBaseItem } from 'libs/common';
import { UserStatuses, UserTypes } from '../enums';

export interface IUser extends IBaseItem {
  name: string;
  surname: string;
  phoneNumber: string;
  password: string;
  type: UserTypes;
  status: UserStatuses;
  information?: string;
}
