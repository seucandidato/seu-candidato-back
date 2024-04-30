import { Module } from '@nestjs/common';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact/entities/contact.entity';
import { ResponseContactEntity } from './contact/entities/response-contact.entity';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [TypeOrmModule.forFeature([ContactEntity, ResponseContactEntity])],
})
export class CmsModule {}
