import { UserStatuses, UserTypes } from '../enums';

export interface IdentifyUserCredentials {
  type: UserTypes;
  status?: UserStatuses;
  phoneNumber: string;
}
