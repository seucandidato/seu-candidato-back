import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { Repository } from 'typeorm';
import { PlanEntity } from './entities/plan.entity';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeORMSqliteTestingModule } from '../../services/test/TypeORMSqliteTestingModule';
import { AuthGuard } from '../../authorization/auth/auth.guard';
import { GuardMock } from '../../services/mock/guardMock';
import { BenefitEntity } from './entities/benefits.entity';

const plan: PlanEntity = {
  title: 'Plus',
  price: 99.99,
  benefits: [{ title: 'One Benefit' }],
};

const benefits: BenefitEntity[] = [
  {
    title: 'Benefício 1',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
  {
    title: 'Benefício 3',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

describe('PlansController', () => {
  let app: INestApplication;
  let controller: PlansController;
  let planRepository: Repository<PlanEntity>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let benefitRepository: Repository<BenefitEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeORMSqliteTestingModule(), JwtModule],
      controllers: [PlansController],
      providers: [PlansService, AuthGuard, JwtService],
    })
      .overrideGuard(AuthGuard)
      .useValue(GuardMock)
      .compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<PlansController>(PlansController);
    planRepository = module.get('PlanEntityRepository');
    benefitRepository = module.get('BenefitEntityRepository');
  });

  const createPlan = async () => {
    await planRepository.insert({
      title: 'Plano Exemplo',
      price: 99.99,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      benefits: [],
    });
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[POST] - should create plan in plan', async () => {
    await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', 'Bearer test')
      .send(plan)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Plano criado com sucesso !');
        expect(response.body.data.title).toBe('Plus');
        expect(response.body.data.price).toBe(99.99);
        expect(response.body.data.benefits[0].title).toBe('One Benefit');
      });
  });

  it('[GET] - find all plans', async () => {
    await createPlan();
    await request(app.getHttpServer())
      .get('/plans')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Planos retornados com sucesso !');
        expect(response.body.data[0].title).toBe('Plano Exemplo');
        expect(response.body.data[0].price).toBe(99.99);
      });
  });

  afterEach(() => {
    planRepository.clear();
    benefitRepository.clear();
  });
});
