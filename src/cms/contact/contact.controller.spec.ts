import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';
import { AuthGuard } from '../../authorization/auth/auth.guard';
import { GuardMock } from '../../services/mock/guardMock';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { UserEntity } from '../../authorization/user/entities/user.entity';
import { Repository } from 'typeorm';

const contact = {
  title: 'Title',
  tags: ['Tag1'],
  message: 'Message',
  email: 'test@test.com',
  active: true,
  user: 1,
};

const contactResponse = {
  title: 'Title',
  message: 'Message',
};

describe('ContactController', () => {
  let app: INestApplication;
  let controller: ContactController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: ContactService;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeORMSqliteTestingModule(), JwtModule],
      controllers: [ContactController],
      providers: [ContactService, JwtService],
    })
      .overrideGuard(AuthGuard)
      .useValue(GuardMock)
      .compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<ContactController>(ContactController);
    service = module.get<ContactService>(ContactService);

    userRepository = module.get('UserEntityRepository');
  });

  const createUser = async () => {
    await userRepository.insert({
      name: 'Clarck Kent',
      username: 'clarckkentt',
      email: 'clarckkent@seucandidato.com',
      phone: '8299097663',
      password: '123456',
      profile: 1,
      active: true,
      hash: 'f66ad3a6c0aa6dd372608e0d12a9ae51',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  }; // modo de uso await createUser(); inserir a info no início do teste.

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[POST] - create contact', async () => {
    createUser();
    await request(app.getHttpServer())
      .post('/contact')
      .set('Authorization', 'Bearer test')
      .send(contact)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Contato criado com sucesso !');
        expect(response.body.data.title).toBe('Title');
        expect(response.body.data.tags[0]).toBe('Tag1');
      });
  });

  it('[POST] - not create contact', async () => {
    const spy = jest
      .spyOn(ContactService.prototype, 'create')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/contact')
      .set('Authorization', 'Bearer test')
      .send(contact)
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[POST] - create contact response', async () => {
    await request(app.getHttpServer())
      .post('/contact/response/1')
      .set('Authorization', 'Bearer test')
      .send(contactResponse)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Resposta enviada com sucesso !');
        expect(response.body.data.title).toBe('Title');
        expect(response.body.data.message).toBe('Message');
        expect(response.body.data.contact).toBe('1');
        expect(response.body.data.id).toBe(1);
      });
  });

  it('[POST] - not create contact response', async () => {
    const spy = jest
      .spyOn(ContactService.prototype, 'responseById')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/contact/response/1')
      .set('Authorization', 'Bearer test')
      .send(contactResponse)
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - get contact', async () => {
    await request(app.getHttpServer())
      .get('/contact')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].id).toBe(1);
        expect(response.body[0].title).toBe('Title');
        expect(response.body[0].message).toBe('Message');
      });
  });

  it('[GET] - not get contact', async () => {
    const spy = jest
      .spyOn(ContactService.prototype, 'findAll')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/contact')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - get contact response', async () => {
    await request(app.getHttpServer())
      .get('/contact/findResponse/1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body[0].id).toBe(1);
        expect(response.body[0].title).toBe('Title');
        expect(response.body[0].message).toBe('Message');
      });
  });

  it('[GET] - not get contact response', async () => {
    const spy = jest
      .spyOn(ContactService.prototype, 'findResponseContact')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/contact/findResponse/1')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });
});
