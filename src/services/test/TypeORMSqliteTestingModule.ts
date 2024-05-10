import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../authorization/user/entities/user.entity';
import { FaqEntity } from '../../cms/faq/entities/question.entity';

export const TypeORMSqliteTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    migrationsRun: true,
    keepConnectionAlive: true,
    entities: [UserEntity, FaqEntity],
  }),
  TypeOrmModule.forFeature([UserEntity, FaqEntity]),
];
