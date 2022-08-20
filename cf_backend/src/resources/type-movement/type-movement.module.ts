import { Module } from '@nestjs/common';
import { TypeMovementService } from './type-movement.service';
import { TypeMovementController } from './type-movement.controller';
import {PrismaService} from "../../core/services/prisma/prisma.service";

@Module({
  controllers: [TypeMovementController],
  providers: [TypeMovementService, PrismaService]
})
export class TypeMovementModule {}
