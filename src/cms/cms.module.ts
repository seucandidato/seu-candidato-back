import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaqController } from './faq/faq.controller';

@Module({
  controllers: [FaqController],
  providers: [],
  imports: [TypeOrmModule.forFeature([])],
})
export class CmsModule {}
