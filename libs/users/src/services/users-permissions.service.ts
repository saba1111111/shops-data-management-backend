import { Inject, Injectable } from '@nestjs/common';
import { IUsersPermissionsRepository } from '../interfaces';
import { handleError } from 'libs/common/helpers';
import { CreateUserPermissionCredentialsDto } from '../dtos';
import { UsersService } from './users.service';
import { PermissionsService } from 'libs/permissions';
import { TCheckPermissionExistenceCredentials } from '../types';
import { UserPermissionAlreadyExistException } from '../exceptions';
import { UserPermissionEntity } from '../entities';
import { USERS_PERMISSIONS_REPOSITORY_TOKEN } from '../constants';

@Injectable()
export class UsersPermissionsService {
  constructor(
    @Inject(USERS_PERMISSIONS_REPOSITORY_TOKEN)
    private readonly usersPermissionsRepository: IUsersPermissionsRepository,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}

  public async createPermission(
    input: CreateUserPermissionCredentialsDto,
  ): Promise<UserPermissionEntity> {
    const { userId, permissionId, allow } = input;

    try {
      await this.usersService.ensureUserExistsById(userId);
      await this.permissionsService.ensurePermissionExistsById(permissionId);
      await this.checkUserPermissionExistence({ userId, permissionId, allow });

      return this.usersPermissionsRepository.create({
        userId,
        permissionId,
        allow,
      });
    } catch (error) {
      handleError(error);
    }
  }

  public async checkUserPermissionExistence(
    credentials: TCheckPermissionExistenceCredentials,
  ) {
    try {
      const where = credentials;
      const permission = await this.usersPermissionsRepository.findOne(where);

      if (permission) {
        throw new UserPermissionAlreadyExistException();
      }
    } catch (error) {
      handleError(error);
    }
  }
}
