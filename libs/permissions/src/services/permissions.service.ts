import { Inject, Injectable } from '@nestjs/common';
import { IPermission, IPermissionsRepository } from '../interfaces';
import {
  TCreatePermissionCredentials,
  TFindPermissionCredentials,
} from '../types';
import {
  PermissionAlreadyExistsException,
  PermissionNotFoundException,
} from '../exceptions';
import { handleError } from 'libs/common/helpers';
import { PERMISSIONS_REPOSITORY_TOKEN } from '../constants';
import { IPaginationProps } from 'libs/common';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(PERMISSIONS_REPOSITORY_TOKEN)
    private readonly permissionsRepository: IPermissionsRepository,
  ) {}

  public async createPermission(
    credentials: TCreatePermissionCredentials,
  ): Promise<IPermission> {
    const { resource, type, description } = credentials;

    try {
      const permission = await this.permissionsRepository.findOne({
        resource,
        type,
      });

      if (permission) {
        throw new PermissionAlreadyExistsException(type, resource);
      }

      return this.permissionsRepository.create({ resource, type, description });
    } catch (error) {
      handleError(error);
    }
  }

  public async getAll(credentials: IPaginationProps) {
    try {
      const permissions = await this.permissionsRepository.findAll(credentials);

      return permissions;
    } catch (error) {
      handleError(error);
    }
  }

  public async findById(id: string) {
    try {
      const permission = await this.permissionsRepository.findById(id);
      if (!permission) {
        throw new PermissionNotFoundException();
      }

      return permission;
    } catch (error) {
      handleError(error);
    }
  }

  private async checkPermissionExistence(
    credentials: TFindPermissionCredentials,
  ): Promise<IPermission> {
    const permission = await this.permissionsRepository.findOne(credentials);

    if (!permission) {
      throw new PermissionNotFoundException();
    }

    return permission;
  }
}
