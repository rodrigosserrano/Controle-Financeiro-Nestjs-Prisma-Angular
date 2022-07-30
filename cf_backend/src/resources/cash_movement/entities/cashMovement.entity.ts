import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class CashMovement implements Prisma.CashMovementUncheckedCreateInput {
    id?: number;

    @ApiProperty({ example: 'EDP', name: 'association', description: 'Uma associação, por exemplo uma empresa que te pagará ou você pagará a ela', required: true})
    association: string;

    @ApiProperty({ example: 'Conta de luz', name: 'name', description: 'Um nome para o campo', required: true})
    name: string;

    @ApiProperty({ example: 'Conta de luz do mes X', name: 'description', description: 'Uma breve descrição', required: false})
    description: string;

    @ApiProperty({ example: '100.00', name: 'price', description: 'Valor decimal', required: false})
    price: string | number | Prisma.Decimal | DecimalJsLike;

    @ApiProperty({ example: '30/07/2022', name: 'dateToPay', description: 'Data para o pagamento', required: false})
    dateToPay?: string | Date;

    @ApiProperty({ example: '2', name: 'typeMovementId', description: 'Relação tipo de movimento feito (valor a pagar / receber por exemplo)', required: true})
    typeMovementId: number;
}