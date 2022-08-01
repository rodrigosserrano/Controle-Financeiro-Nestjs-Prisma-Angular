import {Prisma} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class TypeMovement implements Prisma.TypeMovementUncheckedCreateInput {
    id?: number;

    @ApiProperty({
        example: 'Pagar',
        name: 'name',
        description: 'Nome para o tipo de movimentação',
        required: true
    })
    name: string;

    @ApiProperty({
        example: 'Movimentação a pagar',
        name: 'description',
        description: 'Descrição sobre a movimentação',
        required: true
    })
    description: string;

    cashMovement?: Prisma.CashMovementUncheckedCreateNestedManyWithoutTypeMovementInput;
}
