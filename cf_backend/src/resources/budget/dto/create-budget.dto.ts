import { Budget } from "../entities/budget.entity";
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    price: string | number | Prisma.Decimal | DecimalJsLike;
}

