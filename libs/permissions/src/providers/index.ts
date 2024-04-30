import { PERMISSIONS_REPOSITORY_TOKEN } from '../constants';
import { PermissionsSequelizeRepository } from '../repositories';

export const PermissionsModuleProviders = [
  {
    provide: PERMISSIONS_REPOSITORY_TOKEN,
    useClass: PermissionsSequelizeRepository,
  },
];
