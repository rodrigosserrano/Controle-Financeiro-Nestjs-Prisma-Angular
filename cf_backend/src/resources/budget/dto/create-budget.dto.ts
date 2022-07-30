import { Budget } from "../entities/budget.entity";
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBudgetDto extends Budget {
    @IsString({ message: 'O campo nome precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo nome não pode ser vazio.'})
    name: string;

    @IsOptional()
    description: string;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsOptional()
    value: string | number | Prisma.Decimal | DecimalJsLike;
}

