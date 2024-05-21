import { Module } from '@nestjs/common';
import { ContactService } from './contact/contact.service';
import { ContactController } from './contact/contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './contact/entities/contact.entity';
import { ResponseContactEntity } from './contact/entities/response-contact.entity';
import { PlansController } from './plans/plans.controller';
import { PlansService } from './plans/plans.service';
import { PlanEntity } from './plans/entities/plan.entity';
import { BenefitEntity } from './plans/entities/benefits.entity';


@Module({
  controllers: [ContactController,PlansController],
  providers: [ContactService, PlansService],
  imports: [TypeOrmModule.forFeature([ContactEntity, ResponseContactEntity, PlanEntity, BenefitEntity])],
})
export class CmsModule {}
