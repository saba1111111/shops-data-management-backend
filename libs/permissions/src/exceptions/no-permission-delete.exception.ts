import { HttpException, HttpStatus } from '@nestjs/common';

export class NoPermissionsDeletedException extends HttpException {
  constructor(id: string) {
    super(
      `Failed to delete permission. No records were deleted for ID ${id}.`,
      HttpStatus.EXPECTATION_FAILED,
    );
  }
}
