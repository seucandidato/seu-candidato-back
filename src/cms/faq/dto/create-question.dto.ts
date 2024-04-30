import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsOptional()
    id?: number;
  
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsDate()
    @IsOptional()
    createdAt?: Date;
  
    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}