import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '../errors';

export class UnknownException extends HttpException {
  constructor(message: string) {
    super(
      {
        error: ERRORS.UNKNOWN_ERROR,
        message,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }
}
