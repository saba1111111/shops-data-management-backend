import { HttpException, HttpStatus } from '@nestjs/common';
import { IdentifyUserCredentials } from '../interfaces';

export class UserAlreadyExistsException extends HttpException {
  constructor(input: IdentifyUserCredentials) {
    const contactInformation = [];
    if (input.email) {
      contactInformation.push(`email: '${input.email}'`);
    }
    if (input.phoneNumber) {
      contactInformation.push(`phoneNumber: '${input.phoneNumber}'`);
    }

    super(
      `User with the status: '${input.status}' and ${contactInformation.join(', ')} already exist.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
