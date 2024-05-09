import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel, UsersPermissionsModel } from './models';
import { UsersModuleRepositoryProviders } from './providers';
import { UsersPermissionsService } from './services/users-permissions.service';
import { PermissionsLibModule } from 'libs/permissions';

@Module({
  imports: [
    SequelizeModule.forFeature([UsersModel, UsersPermissionsModel]),
    PermissionsLibModule,
  ],
  providers: [
    UsersService,
    UsersPermissionsService,
    ...UsersModuleRepositoryProviders,
  ],
  exports: [UsersService, UsersPermissionsService],
})
export class UsersLibModule {}
