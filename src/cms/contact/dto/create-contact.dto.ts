import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { ResponseContactEntity } from '../entities/response-contact.entity';

export class CreateContactDto {
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  tags: string[];

  @IsString()
  message: string;

  @IsString()
  email: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsOptional()
  response?: ResponseContactEntity[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
