import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ORMConfig from 'ormconfig';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ORMConfig), AuthorizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
