import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionNotFoundException extends HttpException {
  constructor() {
    super('Wrong credentials, Can not find permission.', HttpStatus.NOT_FOUND);
  }
}
