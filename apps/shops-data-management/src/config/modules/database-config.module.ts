import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DB_ENVS } from '../constants';
import { Dialect } from 'sequelize';
import { PermissionModel } from 'libs/permissions/models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        schema: configService.get<string>(
          DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_SCHEMA,
        ),
        port: configService.get<number>(DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_PORT),
        username: configService.get<string>(
          DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_USERNAME,
        ),
        password: configService.get<string>(
          DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_PASSWORD,
        ),
        database: configService.get<string>(
          DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_DATABASE,
        ),
        host: configService.get<string>(DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_HOST),
        dialect: configService.get<string>(
          DB_ENVS.SHOPS_DATA_MANAGEMENT_DB_DIALECT,
        ) as Dialect,
        models: [PermissionModel],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseConfigModule {}
