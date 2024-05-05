import { HttpException, HttpStatus } from '@nestjs/common';
import { UserTypes } from '../enums';

export class UserAlreadyExistsException extends HttpException {
  constructor(type: UserTypes, phoneNumber: string) {
    super(
      `User with the type: '${type}' and phoneNumber: ${phoneNumber} already exist.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
