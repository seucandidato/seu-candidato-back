import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { sendMailInterface } from '../services/interfaces/sendMail.interface';
import { DataException } from '../services/exceptions/data.exception';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async send(@Body() body: sendMailInterface) {
    try {
      const data = await this.mailerService.sendMail(body);
      return {
        message: 'Email enviado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }
}
