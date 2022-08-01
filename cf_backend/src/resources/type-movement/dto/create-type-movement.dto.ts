import {TypeMovement} from "../entities/type-movement.entity";
import {Prisma} from "@prisma/client";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateTypeMovementDto extends TypeMovement {
    @IsNotEmpty({ context: 'O campo name não pode ser vazio.'})
    @IsString({ context: 'O campo name precisa ser um text.' })
    name: string;

    @IsNotEmpty({ context: 'O campo name não pode ser vazio.'})
    @IsString({ context: 'O campo name precisa ser um text.' })
    description: string;

    cashMovement: Prisma.CashMovementUncheckedCreateNestedManyWithoutTypeMovementInput;
}
