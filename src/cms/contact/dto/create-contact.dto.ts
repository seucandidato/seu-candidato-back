import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { ResponseContactEntity } from '../entities/response-contact.entity';
import { UserEntity } from '../../../authorization/user/entities/user.entity';
import { Type } from 'class-transformer';

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

  @Type(() => UserEntity)
  user: UserEntity;

  @IsOptional()
  response?: ResponseContactEntity[];

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
