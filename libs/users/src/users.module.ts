import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersSequelizeRepository } from './repositories';
import { USERS_REPOSITORY_TOKEN } from './constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './models';

@Module({
  imports: [SequelizeModule.forFeature([UsersModel])],
  providers: [
    UsersService,
    { provide: USERS_REPOSITORY_TOKEN, useClass: UsersSequelizeRepository },
  ],
  exports: [UsersService],
})
export class UsersLibModule {}
