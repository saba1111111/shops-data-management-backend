import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersPermissionsRoutes } from 'libs/users/constants';
import { CreateUserPermissionCredentialsDto } from 'libs/users/dtos';
import { UserPermissionEntity } from 'libs/users/entities';
import { UsersPermissionsService } from 'libs/users/services';

@ApiTags(UsersPermissionsRoutes.controller)
@Controller(UsersPermissionsRoutes.controller)
export class UsersPermissionsController {
  constructor(
    private readonly usersPermissionsService: UsersPermissionsService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({ type: UserPermissionEntity, status: 201 })
  public create(@Body() input: CreateUserPermissionCredentialsDto) {
    return this.usersPermissionsService.createPermission(input);
  }
}
