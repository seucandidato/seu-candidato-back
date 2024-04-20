import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '../errors';

export class AuthException extends HttpException {
  constructor(message: string) {
    super(
      {
        error: ERRORS.LOGIN_ERROR,
        message,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }
}
