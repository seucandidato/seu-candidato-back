import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';
import { MailerService } from '../../mailer/mailer.service';
import { fakeMailer } from '../../services/mock/fakeMailer';
import { GuardMock } from '../../services/mock/guardMock';

const user: UserEntity = {
  name: 'Clarck Kent',
  username: 'clarckkent',
  email: 'clarck@seucandidato.com',
  phone: '8299097663',
  password: '123456',
  profile: 1,
};

const user2: UserEntity = {
  name: 'Lex Luthor',
  username: 'lexluthorr',
  email: 'lex@seucandidato.com',
  phone: '8299097664',
  password: '1234567',
  profile: 2,
};

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeORMSqliteTestingModule(), JwtModule],
      controllers: [UserController],
      providers: [
        UserService,
        { provide: MailerService, useValue: fakeMailer },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(GuardMock)
      .compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

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

  const createUser2 = async () => {
    await userRepository.insert({
      name: 'Lex Luthor',
      username: 'lexluthor',
      email: 'lex@seucandidato.com',
      phone: '8299097664',
      password: '1234567',
      profile: 1,
      active: true,
      hash: 'f66ad3a6c0aa6dd372608e0d12a9ae51',
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[POST] - create user', async () => {
    await request(app.getHttpServer())
      .post('/user')
      .send(user)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Usuário criado com sucesso !');
        expect(response.body.data.name).toBe('Clarck Kent');
        expect(response.body.data.username).toBe('clarckkent');
        expect(response.body.data.email).toBe('clarck@seucandidato.com');
        expect(response.body.data.phone).toBe('8299097663');
      });
  });

  it('[POST] - not create user', async () => {
    const spy = jest
      .spyOn(UserService.prototype, 'create')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/user')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - find all user', async () => {
    await createUser();
    await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body[1].id).toBe(2);
        expect(response.body[1].name).toBe('Clarck Kent');
        expect(response.body[1].username).toBe('clarckkentt');
        expect(response.body[1].email).toBe('clarckkent@seucandidato.com');
        expect(response.body[1].phone).toBe('8299097663');
      });
  });

  it('[GET] - not find all user', async () => {
    const spy = jest
      .spyOn(UserService.prototype, 'findAll')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - find user by email', async () => {
    await createUser2();
    await request(app.getHttpServer())
      .get('/user/findOneByEmail/lex@seucandidato.com')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe('Clarck Kent');
        expect(response.body.username).toBe('clarckkent');
        expect(response.body.email).toBe('clarck@seucandidato.com');
        expect(response.body.phone).toBe('8299097663');
      });
  });

  it('[GET] - not find user by email', async () => {
    const spy = jest
      .spyOn(UserService.prototype, 'findOneByEmail')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/user/findOneByEmail/lex@seucandidato.com')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - find user by username', async () => {
    await request(app.getHttpServer())
      .get('/user/findOneByUsername/lexluthor')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe('Clarck Kent');
        expect(response.body.username).toBe('clarckkent');
        expect(response.body.email).toBe('clarck@seucandidato.com');
        expect(response.body.phone).toBe('8299097663');
      });
  });

  it('[GET] - not find user by username', async () => {
    const spy = jest
      .spyOn(UserService.prototype, 'findOneByUsername')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/user/findOneByUsername/lexluthor')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[PATCH] - update user', async () => {
    await request(app.getHttpServer())
      .patch('/user/clarckkentt')
      .set('Authorization', 'Bearer test')
      .send(user2)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Usuário atualizado com sucesso !');
        expect(response.body.data.affected).toBe(0);
      });
  });

  it('[PATCH] - not update user', async () => {
    const spy = jest
      .spyOn(UserService.prototype, 'update')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .patch('/user/lexluthor')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[DELETE] - delete user', async () => {
    await request(app.getHttpServer())
      .delete('/user/lex@seucandidato.com')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Usuário deletado com sucesso !');
        expect(response.body.data.id).toBe(1);
        expect(response.body.data.name).toBe('Clarck Kent');
        expect(response.body.data.username).toBe('clarckkent');
        expect(response.body.data.email).toBe('clarck@seucandidato.com');
        expect(response.body.data.phone).toBe('8299097663');
      });
  });

  it('[DELETE] - not delete user', async () => {
    const spy = jest
      .spyOn(UserService.prototype, 'remove')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .delete('/user/lex@seucandidato.com')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  afterAll(async () => {
    await app.close();
  });
});
