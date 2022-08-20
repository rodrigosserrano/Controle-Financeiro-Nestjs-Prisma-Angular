import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashMovementModule } from './resources/cash-movement/cash-movement.module';
import { BudgetModule } from './resources/budget/budget.module';
import { TypeMovementModule } from './resources/type-movement/type-movement.module';
import { PrismaModule } from './core/services/prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./core/auth/guards/jwt-guard.guard";

@Module({
  imports: [CashMovementModule, BudgetModule, TypeMovementModule, PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})

export class AppModule {}
