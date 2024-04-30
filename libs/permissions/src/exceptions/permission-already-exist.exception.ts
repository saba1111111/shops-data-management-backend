import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionAlreadyExistsException extends HttpException {
  constructor(permissionType: string, resource: string) {
    super(
      `Permission with the type: '${permissionType}' on resource: '${resource}' already exists`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
