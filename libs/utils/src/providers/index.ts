import { GENERATOR_SERVICE_TOKEN, HASH_SERVICE_TOKEN } from '../constants';
import { BcryptService, CustomGeneratorService } from '../services';

export const UtilsModuleProviders = [
  {
    provide: HASH_SERVICE_TOKEN,
    useClass: BcryptService,
  },
  {
    provide: GENERATOR_SERVICE_TOKEN,
    useClass: CustomGeneratorService,
  },
];
