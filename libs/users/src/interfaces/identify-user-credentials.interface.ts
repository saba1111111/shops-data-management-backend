import { UserStatuses } from '../enums';

export interface IdentifyUserCredentials {
  status: UserStatuses;
  phoneNumber?: string;
  email?: string;
}
