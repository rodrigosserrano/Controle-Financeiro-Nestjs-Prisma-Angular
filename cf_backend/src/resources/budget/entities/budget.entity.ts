import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class Budget implements Prisma.BudgetUncheckedCreateInput {
    id?: number;

    @ApiProperty({
        example: 'Restaurante',
        name: 'name',
        description: 'Um nome para o registro',
        required: true
    })
    name: string;

    @ApiProperty({
        example: 'Valor destinado a gastos com restaurantes, ifood etc.',
        name: 'description',
        description: 'Descrição para o registro',
        required: false
    })
    description: string;

    @ApiProperty({
        example: "200.00",
        name: 'cash',
        description: 'Um valor decimal',
        type: 'string',
        format: 'decimal',
        multipleOf: 0.01,
        required: true
    })
    cash: string | number | Prisma.Decimal | DecimalJsLike;

    @ApiProperty({
        example: "200.00",
        name: 'initialCash',
        description: 'Recebe o mesmo valor de cash para log',
        type: 'string',
        format: 'decimal',
        multipleOf: 0.01,
        required: true
    })
    initialCash: string | number | Prisma.Decimal | DecimalJsLike;

    cashMovement?: Prisma.CashMovementUncheckedCreateNestedManyWithoutBudgetInput;
}
