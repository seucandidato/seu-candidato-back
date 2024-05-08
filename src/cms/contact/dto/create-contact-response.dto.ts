import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ContactEntity } from '../entities/contact.entity';

export class CreateContactResponseDto {
  @IsOptional()
  id?: number;

  @IsNumber()
  contact: ContactEntity;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
