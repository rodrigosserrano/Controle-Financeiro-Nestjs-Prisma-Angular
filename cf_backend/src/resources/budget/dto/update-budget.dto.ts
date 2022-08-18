import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
    @IsString({ message: 'O campo nome precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo nome não pode ser vazio.'})
    name: string;

    @IsOptional()
    description: string;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsOptional()
    cash: string | number | Prisma.Decimal | DecimalJsLike;
}
