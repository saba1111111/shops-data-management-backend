import { HttpException, HttpStatus } from '@nestjs/common';
import { TUserAlreadyExistParameters } from '../types';

export class UserAlreadyExistsException extends HttpException {
  constructor(input: TUserAlreadyExistParameters) {
    const contactInformation = input['email']
      ? `email: '${input['email']}'`
      : `phoneNumber: '${input['phoneNumber']}'`;

    super(
      `User with the status: '${input.status}' and ${contactInformation} already exist.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
