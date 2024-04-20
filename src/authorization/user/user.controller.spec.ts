import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';
import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

const user: UserEntity = {
  name: "Clarck Kent",
  username: "clarckkent",
  email: "clarck@seucandidato.com",
  phone: "8299097663",
  password: "123456"
}

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;
  let service: UserService;
  let userRepository: Repository<UserEntity>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeORMSqliteTestingModule()],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  const createUser = async () => {
    await userRepository.save({
      name: "Clarck Kent",
      username: "clarckkent",
      email: "clarck@seucandidato.com",
      phone: "8299097663",
      password: "123456"
    });
  }; // modo de uso await createUser(); inserir a info no início do teste.

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[POST] - create user', async () => {
    await request (app.getHttpServer())
    .post('/user')
    .send(user)
    .then((response) => {
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Usuário criado com sucesso !');
      expect(response.body.data.name).toBe('Clarck Kent');
      expect(response.body.data.username).toBe('clarckkent');
      expect(response.body.data.email).toBe('clarck@seucandidato.com');
      expect(response.body.data.phone).toBe('8299097663');
    })
  })

  it('[POST] - not create user', async () => {
    const spy = jest.spyOn(UserService.prototype, 'create').mockImplementation(() => {
      throw new Error('invalid request');
    });

    await request (app.getHttpServer())
    .post('/user')
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.statusCode).toBe(502);
    })

    spy.mockRestore();
  })

  fit('[GET] - find all user', async () => {
    await createUser();
    await request (app.getHttpServer())
    .get('/user')
    .then((response) => {
      console.log(response)
      // expect(response.statusCode).toBe(502);
      // expect(response.statusCode).toBe(502);
    })
  })

  it('[GET] - not find all user', async () => {
    const spy = jest.spyOn(UserService.prototype, 'findAll').mockImplementation(() => {
      throw new Error('invalid request');
    });

    await request (app.getHttpServer())
    .get('/user')
    .then((response) => {
      expect(response.statusCode).toBe(502);
      expect(response.statusCode).toBe(502);
    })

    spy.mockRestore();
  })
});
