import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/plan/create-plan.dto';
import { UpdatePlanDto } from './dto/plan/update-plan.dto';
import { DataException } from '../../services/exceptions/data.exception';
import { CreateBenefitDto } from './dto/benefit/create-benefit.dto';
import { AuthGuard } from '../../authorization/auth/auth.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPlanDto: CreatePlanDto) {
    try {
      const data = await this.plansService.create(createPlanDto);
      return {
        message: 'Plano criado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  // @UseGuards(AuthGuard)
  @Post('benefits')
  async createBenefit(@Body() createBenefitDto: CreateBenefitDto) {
    try {
      const data = await this.plansService.createBenefit(createBenefitDto);
      return {
        message: 'Benefício criado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
      const data = this.plansService.findAll();
      return {
        message: 'Planos retornados com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const data = this.plansService.findOne(+id);
      return {
        message: 'Plano retornado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    try {
      const data = await this.plansService.update(+id, updatePlanDto);
      return {
        message: 'Plano atualizado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.plansService.remove(+id);
      return {
        message: 'Plano deletado com sucesso !',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }
}
