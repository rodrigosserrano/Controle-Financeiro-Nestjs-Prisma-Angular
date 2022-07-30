import { PartialType } from '@nestjs/mapped-types';
import { CreateCashMovementDto } from './create-cashMovement.dto';

export class UpdateCashMovementDto extends PartialType(CreateCashMovementDto) {}
