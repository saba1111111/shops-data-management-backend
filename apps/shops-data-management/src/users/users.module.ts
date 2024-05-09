import { Module } from '@nestjs/common';
import { UsersLibModule } from 'libs/users';
import { UsersPermissionsController } from './users-permissions.controller';

@Module({
  imports: [UsersLibModule],
  controllers: [UsersPermissionsController],
})
export class UsersModule {}
