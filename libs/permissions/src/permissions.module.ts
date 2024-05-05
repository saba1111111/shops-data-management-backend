import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel } from './models';
import { PERMISSIONS_REPOSITORY_TOKEN } from './constants';
import { PermissionsSequelizeRepository } from './repositories';

@Module({
  imports: [SequelizeModule.forFeature([PermissionModel])],
  providers: [
    PermissionsService,
    {
      provide: PERMISSIONS_REPOSITORY_TOKEN,
      useClass: PermissionsSequelizeRepository,
    },
  ],
  exports: [PermissionsService],
})
export class PermissionsLibModule {}
