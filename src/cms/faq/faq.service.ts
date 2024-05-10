import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FaqEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
import { DataException } from '../../services/exceptions/data.exception';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(FaqEntity)
    private faqRepository: Repository<FaqEntity>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    createQuestionDto.createdAt = new Date(Date.now());
    createQuestionDto.updatedAt = new Date(Date.now());
    const data = this.faqRepository.save({ ...createQuestionDto });
    return data;
  }

  async findAll() {
    const data = await this.faqRepository.find();
    if (data.length === 0) {
      throw new DataException('Sem perguntas cadastradas');
    }
    return data;
  }

  async findOneById(id: number) {
    const data = await this.faqRepository.find({ where: { id } });
    if (data.length === 0) {
      throw new DataException('Pergunta não cadastrada');
    }
    return data;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    updateQuestionDto.updatedAt = new Date(Date.now());
    const data = await this.faqRepository.update({ id }, updateQuestionDto);
    return data;
  }

  async remove(id: number) {
    const question = await this.findOneById(id);
    if (!question) {
      throw new DataException('Pergunta não cadastrada!');
    }
    return this.faqRepository.delete({ id });
  }
}
