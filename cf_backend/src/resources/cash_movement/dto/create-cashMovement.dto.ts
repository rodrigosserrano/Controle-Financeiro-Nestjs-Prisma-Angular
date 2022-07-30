import { CashMovement } from '../entities/cashMovement.entity';
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";


export class CreateCashMovementDto extends CashMovement {
    @IsNotEmpty({ context: 'O campo tipoContaId não pode ser vazio.'})
    @IsInt({ context: 'O campo tipoContaId precisa ser um inteiro.' })
    tipoContaId: number;

    @IsString({ message: 'O campo nome precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo nome não pode ser vazio.'})
    name: string;

    @IsString({ message: 'O campo associação precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo associação não pode ser vazio.'})
    association: string;

    @IsOptional()
    description: string;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsOptional()
    price: string | number | Prisma.Decimal | DecimalJsLike;

    @IsDate({ message: 'O campo data precisa ser data.' })
    @IsNotEmpty({ message: 'O campo data não pode ser vazio.'})
    dateToPay: string | Date;
}