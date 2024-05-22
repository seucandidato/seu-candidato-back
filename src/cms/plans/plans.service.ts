import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/plan/create-plan.dto';
import { UpdatePlanDto } from './dto/plan/update-plan.dto';
import { PlanEntity } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DataException } from 'src/services/exceptions/data.exception';
import { BenefitEntity } from './entities/benefits.entity';
import { CreateBenefitDto } from './dto/benefit/create-benefit.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(PlanEntity)
    private planRepository: Repository<PlanEntity>,
    @InjectRepository(BenefitEntity)
    private benefitRepository: Repository<BenefitEntity>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    createPlanDto.createdAt = new Date(Date.now());
    createPlanDto.updatedAt = new Date(Date.now());
    createPlanDto.benefits = this.buildBenefit(createPlanDto.benefits);

    const data = await this.planRepository.save({ ...createPlanDto });
    return data;
  }

  buildBenefit(createBenefitsDto: CreateBenefitDto[]): CreateBenefitDto[] {
    const benefits: CreateBenefitDto[] = [];
    for (const benefit of createBenefitsDto) {
      benefit.createdAt = new Date(Date.now());
      benefit.updatedAt = new Date(Date.now());

      benefits.push(benefit);
    }

    return benefits;
  }

  async findAll() {
    const data = await this.planRepository.find();
    if (data.length === 0) {
      throw new DataException('Sem planos cadastrados');
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.planRepository.find({ where: { id } });
    if (data.length === 0) {
      throw new DataException('Plano não cadastrado');
    }
    return data;
  }

  async update(id: number, updatePlanDto: UpdatePlanDto) {
    updatePlanDto.updatedAt = new Date(Date.now());
    const data = await this.planRepository.update({ id }, updatePlanDto);
    return data;
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    if (!plan) {
      throw new DataException('Plano não cadastrado!');
    }
    return this.planRepository.delete({ id });
  }

  async createBenefit(createBenefitDto: CreateBenefitDto) {
    createBenefitDto.createdAt = new Date(Date.now());
    createBenefitDto.updatedAt = new Date(Date.now());
    const data = await this.benefitRepository.save({ ...createBenefitDto });
    return data;
  }
}
