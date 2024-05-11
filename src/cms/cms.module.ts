import { Module } from '@nestjs/common';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact/entities/contact.entity';
import { ResponseContactEntity } from './contact/entities/response-contact.entity';
import { FaqController } from './faq/faq.controller';
import { FaqService } from './faq/faq.service';
import { FaqEntity } from './faq/entities/question.entity';
import { UserEntity } from '../authorization/user/entities/user.entity';

@Module({
  controllers: [ContactController, FaqController],
  providers: [ContactService, FaqService],
  imports: [
    TypeOrmModule.forFeature([
      ContactEntity,
      ResponseContactEntity,
      FaqEntity,
      UserEntity,
    ]),
  ],
})
export class CmsModule {}
