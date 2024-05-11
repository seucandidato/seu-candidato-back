import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { DataException } from '../../services/exceptions/data.exception';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from '../../authorization/auth/auth.guard';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const data = await this.faqService.create(createQuestionDto);
      return {
        message: 'Pergunta cadastrada com sucesso!',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get()
  findAll() {
    try {
      return this.faqService.findAll();
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @Get('/:id')
  findOneById(@Param('id') id: number) {
    try {
      return this.faqService.findOneById(id);
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      const data = await this.faqService.update(id, updateQuestionDto);
      return {
        message: 'Pergunta atualizada com sucesso',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const data = await this.faqService.remove(id);
      return {
        message: 'Pergunta deletada com sucesso',
        data,
      };
    } catch (error: any) {
      throw new DataException(error.message);
    }
  }
}
