import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../authorization/user/entities/user.entity';
import { ResponseContactEntity } from '../../cms/contact/entities/response-contact.entity';
import { ContactEntity } from '../../cms/contact/entities/contact.entity';

export const TypeORMSqliteTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    migrationsRun: true,
    keepConnectionAlive: true,
    entities: [UserEntity, ContactEntity, ResponseContactEntity],
  }),
  TypeOrmModule.forFeature([UserEntity, ContactEntity, ResponseContactEntity]),
];
