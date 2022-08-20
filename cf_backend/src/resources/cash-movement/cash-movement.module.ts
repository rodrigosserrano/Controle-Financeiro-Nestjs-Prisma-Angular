import { Module } from '@nestjs/common';
import { CashMovementService } from './cash-movement.service';
import { CashMovementController } from './cash-movement.controller';
import { PrismaService } from "../../core/services/prisma/prisma.service";

@Module({
  controllers: [CashMovementController],
  providers: [CashMovementService, PrismaService]
})
export class CashMovementModule {}
