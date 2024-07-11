import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateBenefitDto {
  @IsString()
  title: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
