import { IsArray, IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateBenefitDto } from "../benefit/create-benefit.dto";

export class CreatePlanDto {

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsArray()
    benefits: [CreateBenefitDto];
}
