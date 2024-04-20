import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '../errors';

export class DataException extends HttpException {
  constructor(message: string) {
    super(
      {
        error: ERRORS.DATA_ERROR,
        message,
      },
      HttpStatus.BAD_GATEWAY,
    );
  }
}
