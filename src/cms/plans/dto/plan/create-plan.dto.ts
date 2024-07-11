import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBenefitDto } from '../benefit/create-benefit.dto';

export class CreatePlanDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsArray()
  benefits: CreateBenefitDto[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
