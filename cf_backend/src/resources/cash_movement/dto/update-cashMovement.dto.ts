import { PartialType } from '@nestjs/mapped-types';
import { CreateCashMovementDto } from './create-cashMovement.dto';
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCashMovementDto extends PartialType(CreateCashMovementDto) {
    @IsString({ message: 'O campo associação precisa ser texto.'})
    @IsNotEmpty({ message: 'O campo associação não pode ser vazio.'})
    association: string;

    @IsOptional()
    description: string;
}
