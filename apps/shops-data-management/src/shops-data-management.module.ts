import { Module } from '@nestjs/common';
import { ShopsDataManagementController } from './shops-data-management.controller';
import { ShopsDataManagementService } from './shops-data-management.service';

@Module({
  imports: [],
  controllers: [ShopsDataManagementController],
  providers: [ShopsDataManagementService],
})
export class ShopsDataManagementModule {}
