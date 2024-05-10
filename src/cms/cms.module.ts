import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqController } from './faq/faq.controller';
import { FaqService } from './faq/faq.service';
import { FaqEntity } from './faq/entities/question.entity';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
  imports: [TypeOrmModule.forFeature([FaqEntity])],
})
export class CmsModule {}
