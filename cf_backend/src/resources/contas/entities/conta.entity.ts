import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class Contas implements Prisma.ContasUncheckedCreateInput {
    id?: number;

    @ApiProperty({ example: 'EDP', name: 'association', description: 'Uma associação, por exemplo uma empresa que te pagará ou você pagará a ela', required: true})
    association: string;

    @ApiProperty({ example: 'Conta de luz', name: 'name', description: 'Um nome para o campo', required: true})
    name: string;

    @ApiProperty({ example: 'Conta de luz do mes X', name: 'description', description: 'Uma breve descrição', required: false})
    description: string;

    @ApiProperty({ example: '100.00', name: 'value', description: 'Valor decimal', required: false})
    value: string | number | Prisma.Decimal | DecimalJsLike;

    @ApiProperty({ example: '30/07/2022', name: 'dateToPay', description: 'Data para o pagamento', required: false})
    dateToPay?: string | Date;

    @ApiProperty({ example: '2', name: 'tipoContaId', description: 'Relação tipo de conta com a conta', required: true})
    tipoContaId: number;
}