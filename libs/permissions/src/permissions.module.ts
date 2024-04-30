import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsModuleProviders } from './providers';
import { PermissionModel } from './models';

@Module({
  imports: [SequelizeModule.forFeature([PermissionModel])],
  providers: [PermissionsService, ...PermissionsModuleProviders],
  exports: [PermissionsService],
})
export class PermissionsLibModule {}
