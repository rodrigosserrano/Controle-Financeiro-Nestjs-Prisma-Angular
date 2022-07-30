import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class Budget implements Prisma.BudgetUncheckedCreateInput {
    id?: number;

    @ApiProperty({
        example: 'Salário',
        name: 'name',
        description: 'Um nome para o registro',
        required: true
    })
    name: string;

    @ApiProperty({
        example: 'Valor recebido no mês',
        name: 'description',
        description: 'Descrição para o registro',
        required: false
    })
    description: string;

    @ApiProperty({
        example: '10.00',
        name: 'value',
        description: 'Um valor decimal',
        required: true
    })
    value: string | number | Prisma.Decimal | DecimalJsLike;
}
