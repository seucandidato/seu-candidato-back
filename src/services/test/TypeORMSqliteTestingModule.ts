import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../authorization/user/entities/user.entity';
import { FaqEntity } from '../../cms/faq/entities/question.entity';
import { ResponseContactEntity } from '../../cms/contact/entities/response-contact.entity';
import { ContactEntity } from '../../cms/contact/entities/contact.entity';
import { PlanEntity } from '../../cms/plans/entities/plan.entity';
import { BenefitEntity } from '../../cms/plans/entities/benefits.entity';

export const TypeORMSqliteTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    migrationsRun: true,
    keepConnectionAlive: true,
    entities: [
      UserEntity,
      ContactEntity,
      ResponseContactEntity,
      UserEntity,
      FaqEntity,
      PlanEntity,
      BenefitEntity
    ],
  }),
  TypeOrmModule.forFeature([
    UserEntity,
    ContactEntity,
    ResponseContactEntity,
    FaqEntity,
    PlanEntity,
    BenefitEntity
  ]),
];
