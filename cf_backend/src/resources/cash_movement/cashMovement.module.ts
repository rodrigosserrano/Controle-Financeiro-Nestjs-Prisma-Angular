import { Module } from '@nestjs/common';
import { CashMovementService } from './cashMovement.service';
import { CashMovementController } from './cashMovement.controller';
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [CashMovementController],
  providers: [CashMovementService, PrismaService]
})
export class CashMovementModule {}
