import { Prisma } from "@prisma/client";
import { DecimalJsLike } from "@prisma/client/runtime";
import {ApiProperty} from "@nestjs/swagger";

export class User implements Prisma.UserUncheckedCreateInput {
    id?: number;

    @ApiProperty({
        example: 'teste@email.com',
        name: 'email',
        description: 'Email de registro',
        required: true
    })
    email: string;

    @ApiProperty({
        example: 'Senha#123',
        name: 'password',
        description: 'Uma senha para o registro',
        required: true
    })
    password: string;

    @ApiProperty({
        example: 'Walter',
        name: 'firstName',
        description: 'Um nome para o registro',
        required: true
    })
    firstName: string;

    @ApiProperty({
        example: 'White',
        name: 'lastName',
        description: 'Um sobrenome para o registro',
        required: true
    })
    lastName: string;

    @ApiProperty({
        example: "2000.00",
        name: 'grossIncome',
        description: 'Renda bruta',
        type: 'string',
        format: 'decimal',
        multipleOf: 0.01,
        required: true
    })
    grossIncome: string | number | Prisma.Decimal | DecimalJsLike;

    refreshToken?: string;

    updatedAt?: Date;

    budget?: Prisma.BudgetUncheckedCreateNestedManyWithoutUserInput;
    cashMovement?: Prisma.CashMovementUncheckedCreateNestedManyWithoutUserInput;
}
