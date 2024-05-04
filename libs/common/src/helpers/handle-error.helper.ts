import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function handleError(error: unknown) {
  if (error instanceof HttpException) {
    throw error;
  } else {
    console.error(`### Unhandled error: ${error}. ###`);
    throw new InternalServerErrorException();
  }
}
