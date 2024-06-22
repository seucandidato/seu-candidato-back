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
import { title } from 'process';

const plan: PlanEntity = {
  title: 'Plus',
  price: 99.99,
  benefits: [{ title: 'One Benefit' }],
};

const benefits: BenefitEntity = {
    title: 'Premium'
};

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

  const createBenefits = async () => {
    const benefits: BenefitEntity[] = [
      {
        title: 'Benefício 1',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      }
    ];
  
    return await benefitRepository.save(benefits);
  };


  const createPlan = async () => {
    const benefits = await createBenefits();
    const plan: PlanEntity = {
      title: 'Plano Exemplo',
      price: 99.99,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      benefits: benefits,  
    };
  
    return await planRepository.save(plan);
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

  
  it('[POST] - should not create plan', async () => {
    const spy = jest
      .spyOn(PlansService.prototype, 'create')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/plans')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[POST] - should create benefit', async () => {
    await request(app.getHttpServer())
      .post('/plans/benefits')
      .set('Authorization', 'Bearer test')
      .send(benefits)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Benefício criado com sucesso!');
        expect(response.body.data.title).toBe('Premium');
      });
  });

  it('[POST] - should not create benefit', async () => {
    const spy = jest
      .spyOn(PlansService.prototype, 'createBenefit')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .post('/plans/benefits')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
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
        expect(response.body.data[0].benefits[0].title).toBe('Benefício 1');
      });
  });

  it('[GET] - Should not find all plans', async () => {
    await request(app.getHttpServer())
      .get('/plans')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.message).toBe('Sem planos cadastrados');
      });
  });

  it('[GET] - not find all plans', async () => {
    const spy = jest
      .spyOn(PlansService.prototype, 'findAll')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/plans')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[GET] - find plan by id', async () => {
    await createPlan();
    await request(app.getHttpServer())
      .get('/plans/3')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Plano retornado com sucesso !');
        expect(response.body.data[0].title).toBe('Plano Exemplo');
        expect(response.body.data[0].price).toBe(99.99);
        expect(response.body.data[0].benefits[0].title).toBe('Benefício 1');
      });
  });

  it('[GET] - Should not find plan by id (Wrong ID)', async () => {
    await createPlan();
    await request(app.getHttpServer())
      .get('/plans/31')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.message).toBe('Plano não cadastrado');
      });
  });

  it('[GET] - not find plan by id (Invalid Request)', async () => {
    const spy = jest
      .spyOn(PlansService.prototype, 'findOne')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .get('/plans/3')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[PATCH] - update plan', async () => {
    await createPlan();
    await request(app.getHttpServer())
      .patch('/plans/5')
      .set('Authorization', 'Bearer test')
      .send({ title: 'update', price: 100, benefits: [{ title: 'update' }] })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Plano atualizado com sucesso !');
        expect(response.body.data.affected).toBeUndefined();
      });
  });


  it('[PATCH] - not update plan', async () => {
    const spy = jest
      .spyOn(PlansService.prototype, 'update')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .patch('/plans/4')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  it('[DELETE] - delete plan', async () => {
    await createPlan();
    await request(app.getHttpServer())
      .delete('/plans/6')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Plano deletado com sucesso !');
        expect(response.body.data.affected).toBe(1);
      });
  });

  it('[DELETE] - not delete plan', async () => {
    await createPlan();
    await request(app.getHttpServer())
      .delete('/plans/225')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.message).toBe('Plano não cadastrado');
      });
  });

  it('[DELETE] - not delete plan', async () => {
    const spy = jest
      .spyOn(PlansService.prototype, 'remove')
      .mockImplementation(() => {
        throw new Error('invalid request');
      });

    await request(app.getHttpServer())
      .delete('/plans/5')
      .set('Authorization', 'Bearer test')
      .then((response) => {
        expect(response.statusCode).toBe(502);
        expect(response.body.error).toBe('Erro de dados');
        expect(response.body.message).toBe('invalid request');
      });

    spy.mockRestore();
  });

  afterEach(() => {
    planRepository.clear();
    benefitRepository.clear();
  });
});
