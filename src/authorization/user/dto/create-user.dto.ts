import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  checked?: boolean;

  @IsString()
  @IsOptional()
  hash?: string;

  @IsString()
  password: string;

  @IsNumber()
  profile: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
