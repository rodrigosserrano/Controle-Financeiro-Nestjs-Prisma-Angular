import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {IsDecimal, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {Prisma} from "@prisma/client";
import {DecimalJsLike} from "@prisma/client/runtime";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail({}, { message: 'O campo email precisa ser válido.' })
    @IsNotEmpty({ message: 'O campo email não pode ser vazio.'})
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca',
    })
    password: string;

    @IsString({ message: 'O campo primeiro nome precisa ser válido.'})
    @IsNotEmpty({ message: 'O campo firstName não pode ser vazio.'})
    firstName: string;

    @IsString({ message: 'O campo sobrenome precisa ser válido.'})
    @IsNotEmpty({ message: 'O campo lastName não pode ser vazio.'})
    lastName: string;

    @IsDecimal({}, { message: 'O campo valor precisa ser decimal.' })
    @IsNotEmpty({ message: 'O campo password não pode ser vazio.'})
    grossIncome: string | number | Prisma.Decimal | DecimalJsLike;
}
