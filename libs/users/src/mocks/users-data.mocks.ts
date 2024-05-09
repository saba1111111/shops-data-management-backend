import { randomBytes } from 'crypto';
import { UserStatuses, UserTypes } from '../enums';
import { IUser } from '../interfaces';
import { MockingDates } from 'libs/common/mocks';

export const MockUser: IUser = Object.freeze({
  id: randomBytes(16).toString('hex'),
  name: 'saba',
  surname: 'pachulia',
  phoneNumber: '591191922',
  password: 'georgia123',
  type: UserTypes.WORKER,
  status: UserStatuses.ACTIVE,
  ...MockingDates,
});
