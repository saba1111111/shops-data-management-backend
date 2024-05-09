import {
  USERS_PERMISSIONS_REPOSITORY_TOKEN,
  USERS_REPOSITORY_TOKEN,
} from '../constants';
import {
  UsersPermissionsSequelizeRepository,
  UsersSequelizeRepository,
} from '../repositories';

export const UsersModuleRepositoryProviders = [
  { provide: USERS_REPOSITORY_TOKEN, useClass: UsersSequelizeRepository },
  {
    provide: USERS_PERMISSIONS_REPOSITORY_TOKEN,
    useClass: UsersPermissionsSequelizeRepository,
  },
];
