import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { sendMailInterface } from '../services/interfaces/sendMail.interface';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter<SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMail(body: sendMailInterface) {
    try {
      const info = await this.transporter.sendMail({
        from: 'No-Reply SeuCandidato.com <no-reply@seucandidato.com>',
        to: body.to,
        subject: body.subject,
        text: body.content,
      });
      return info;
    } catch (error) {
      throw error;
    }
  }
}
