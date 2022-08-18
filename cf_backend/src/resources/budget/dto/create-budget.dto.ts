import { Budget } from "../entities/budget.entity";
import {IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";

export class CreateBudgetDto extends Budget {
    @IsString({ message: 'O campo nome precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo nome não pode ser vazio.'})
    name: string;

    @IsOptional()
    description: string;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsOptional()
    cash: string | number | Prisma.Decimal | DecimalJsLike;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsOptional()
    initialCash: string | number | Prisma.Decimal | DecimalJsLike;

    @IsNotEmpty({ context: 'O campo userId não pode ser vazio.'})
    @IsInt({ context: 'O campo userId precisa ser um inteiro.' })
    userId: number;
}

