import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseConfigModule],
  controllers: [],
  providers: [],
})
export class ShopsDataManagementModule {}
