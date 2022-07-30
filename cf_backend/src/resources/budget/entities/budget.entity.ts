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
        example: '200.00',
        name: 'price',
        description: 'Um valor decimal',
        required: true
    })
    price: string | number | Prisma.Decimal | DecimalJsLike;
}
