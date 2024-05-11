import { Test, TestingModule } from '@nestjs/testing';
import { FaqController } from './faq.controller';
import { INestApplication } from '@nestjs/common';
import { FaqService } from './faq.service';
import { Repository } from 'typeorm';
import { FaqEntity } from './entities/question.entity';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';
import { AuthGuard } from '../../authorization/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';

const question: FaqEntity = {
  question: 'How to create',
  response: 'Just create',
};

describe('FaqController', () => {
  let app: INestApplication;
  let controller: FaqController;
  let faqRepository: Repository<FaqEntity>;

  const createQuestion = async () => {
    await faqRepository.insert({
      question: 'How to susbcribe',
      response: 'Just subscribe',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeORMSqliteTestingModule()],
      controllers: [FaqController],
      providers: [FaqService, AuthGuard, JwtService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<FaqController>(FaqController);
    faqRepository = module.get('FaqEntityRepository');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[POST] - should create question in faq', async () => {
    await request(app.getHttpServer())
      .post('/faq')
      .send(question)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Pergunta cadastrada com sucesso!');
        expect(response.body.data.question).toBe('How to create');
        expect(response.body.data.response).toBe('Just create');
      });
  });

  it('[POST] - should not create question in faq', async () => {
    const spy = jest
      .spyOn(FaqService.prototype, 'create')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/faq')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - find all questions', async () => {
    await createQuestion();
    await request(app.getHttpServer())
      .get('/faq')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].question).toBe('How to susbcribe');
        expect(response.body[0].response).toBe('Just subscribe');
      });
  });

  it('[GET] - not find all user', async () => {
    const spy = jest
      .spyOn(FaqService.prototype, 'findAll')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/faq')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - find question by id', async () => {
    await createQuestion();
    await request(app.getHttpServer())
      .get('/faq/3')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].question).toBe('How to susbcribe');
        expect(response.body[0].response).toBe('Just subscribe');
      });
  });

  it('[GET] - Should not find question by id (Wrong ID)', async () => {
    await createQuestion();
    await request(app.getHttpServer())
      .get('/faq/3112')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.message).toBe('Pergunta não cadastrada');
      });
  });

  it('[GET] - not find question by id (Invalid Request)', async () => {
    const spy = jest
      .spyOn(FaqService.prototype, 'findOneById')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/faq/1')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  afterEach(() => {
    faqRepository.clear();
  });
});
