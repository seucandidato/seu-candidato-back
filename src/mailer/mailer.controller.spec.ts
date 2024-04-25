import { Test, TestingModule } from '@nestjs/testing';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import * as request from 'supertest';
import { sendMailInterface } from '../services/interfaces/sendMail.interface';
import { INestApplication } from '@nestjs/common';

const body: sendMailInterface = {
  to: 'teste@teste.com',
  subject: 'Teste subject',
  content: 'Teste content',
};

describe('MailerController', () => {
  let app: INestApplication;
  let controller: MailerController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: MailerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [MailerService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<MailerController>(MailerController);
    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[POST] - not send mail', async () => {
    const spy = jest
      .spyOn(MailerService.prototype, 'sendMail')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/mailer')
      .send()
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });
});
