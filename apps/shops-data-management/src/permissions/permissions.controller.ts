import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsService } from 'libs/permissions';
import { PermissionsRoutes } from 'libs/permissions/constants';
import {
  CreatePermissionDto,
  PaginationCredentialsDto,
} from 'libs/permissions/dtos';
import {
  PaginationPermissionsResponseEntity,
  PermissionEntity,
} from 'libs/permissions/entities';

@ApiTags(PermissionsRoutes.controller)
@Controller({ path: PermissionsRoutes.controller, version: '1' })
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post()
  @ApiResponse({ type: PermissionEntity, status: 201 })
  public createPermission(@Body() credentials: CreatePermissionDto) {
    return this.permissionService.createPermission(credentials);
  }

  @Post(PermissionsRoutes.paginate)
  @ApiResponse({ status: 200, type: PaginationPermissionsResponseEntity })
  public paginatePermissions(@Body() paginationData: PaginationCredentialsDto) {
    return this.permissionService.getAll(paginationData);
  }
}
