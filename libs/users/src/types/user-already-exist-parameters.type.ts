import { UserStatuses } from '../enums';

export type TUserAlreadyExistParameters =
  | {
      status: UserStatuses;
      email: string;
    }
  | { status: UserStatuses; phoneNumber?: string };
