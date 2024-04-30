import { Module } from '@nestjs/common';
import { PermissionsLibModule } from 'libs/permissions';
import { PermissionsController } from './permissions.controller';

@Module({
  imports: [PermissionsLibModule],
  controllers: [PermissionsController],
  providers: [],
})
export class PermissionsModule {}
