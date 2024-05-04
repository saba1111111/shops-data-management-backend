import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsService } from 'libs/permissions';
import { PermissionsRoutes } from 'libs/permissions/constants';
import {
  InsertPermissionDto,
  PaginationCredentialsDto,
  UpdatePermissionDto,
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
  @HttpCode(201)
  @ApiResponse({ type: PermissionEntity, status: 201 })
  public createPermission(@Body() credentials: InsertPermissionDto) {
    return this.permissionService.createPermission(credentials);
  }

  @Post(PermissionsRoutes.paginate)
  @HttpCode(200)
  @ApiResponse({ status: 200, type: PaginationPermissionsResponseEntity })
  public paginatePermissions(@Body() paginationData: PaginationCredentialsDto) {
    return this.permissionService.getAll(paginationData);
  }

  @Get(PermissionsRoutes.permission_id)
  @HttpCode(200)
  @ApiResponse({ status: 200, type: PermissionEntity })
  public getPermission(@Param('id') id: string) {
    return this.permissionService.findById(id);
  }

  @Patch(PermissionsRoutes.permission_id)
  @HttpCode(200)
  @ApiResponse({ status: 200, type: PermissionEntity })
  public updatePermission(
    @Param('id') id: string,
    @Body() updateData: UpdatePermissionDto,
  ) {
    return this.permissionService.updateById(id, updateData);
  }

  @Delete(PermissionsRoutes.permission_id)
  @HttpCode(204)
  @ApiResponse({ status: 204, type: Number })
  public deletePermission(@Param('id') id: string) {
    return this.permissionService.deleteById(id);
  }
}
