import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class CashMovement implements Prisma.CashMovementUncheckedCreateInput {
    id?: number;

    @ApiProperty({
        example: 'EDP',
        name: 'association',
        description: 'Uma associação, por exemplo uma empresa que te pagará ou você pagará a ela',
        required: true
    })
    association: string;

    @ApiProperty({
        example: 'Conta de luz do mes X',
        name: 'description',
        description: 'Uma breve descrição',
        required: false
    })
    description: string;

    @ApiProperty({
        example: '100.00',
        name: 'cash',
        description: 'Valor decimal',
        type: 'string',
        required: false,
    })
    cash: string | number | Prisma.Decimal | DecimalJsLike;

    @ApiProperty({
        example: "30/07/2022",
        name: 'dateToPay',
        description: 'Data para o pagamento',
        type: 'string',
        required: false
    })
    dateToPay?: string | Date;

    @ApiProperty({
        example: '2',
        name: 'userId',
        description: 'Relação da movimentação feita com o usuário',
        required: true
    })
    userId: number;

    @ApiProperty({
        example: '2',
        name: 'budgetId',
        description: 'Relação com o budget, de onde está entrando ou saindo dinheiro.',
        required: true
    })
    budgetId: number;

    @ApiProperty({
        example: '2',
        name: 'typeMovementId',
        description: 'Relação tipo de movimento feito (valor a pagar / receber por exemplo)',
        required: true
    })
    typeMovementId: number;
}