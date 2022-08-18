import { CashMovement } from '../entities/cashMovement.entity';
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";


export class CreateCashMovementDto extends CashMovement {
    @IsString({ message: 'O campo associação precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo associação não pode ser vazio.'})
    association: string;

    @IsOptional()
    description: string;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsOptional()
    cash: string | number | Prisma.Decimal | DecimalJsLike;

    @IsString({ message: 'O campo deve ser passado como 10/11/2022'})
    @IsNotEmpty({ message: 'O campo data não pode ser vazio.'})
    dateToPay: string | Date;

    @IsNotEmpty({ context: 'O campo userId não pode ser vazio.'})
    @IsInt({ context: 'O campo userId precisa ser um inteiro.' })
    userId: number;

    @IsNotEmpty({ context: 'O campo budgetId não pode ser vazio.'})
    @IsInt({ context: 'O campo budgetId precisa ser um inteiro.' })
    budgetId: number;

    @IsNotEmpty({ context: 'O campo typeMovementId não pode ser vazio.'})
    @IsInt({ context: 'O campo typeMovementId precisa ser um inteiro.' })
    typeMovementId: number;
}