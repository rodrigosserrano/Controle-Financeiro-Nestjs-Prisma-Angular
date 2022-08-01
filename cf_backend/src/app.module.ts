import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashMovementModule } from './resources/cash_movement/cashMovement.module';
import { BudgetModule } from './resources/budget/budget.module';
import { TypeMovementModule } from './resources/type-movement/type-movement.module';

@Module({
  imports: [CashMovementModule, BudgetModule, TypeMovementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
