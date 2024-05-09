import { HttpException, HttpStatus } from '@nestjs/common';

export class UserPermissionAlreadyExistException extends HttpException {
  constructor() {
    super(
      `User Permission with this credentials already exist.`,
      HttpStatus.NOT_FOUND,
    );
  }
}
