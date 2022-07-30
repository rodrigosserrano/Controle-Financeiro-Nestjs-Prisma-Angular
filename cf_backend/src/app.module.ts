import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashMovementModule } from './resources/cash_movement/cashMovement.module';
import { BudgetModule } from './resources/budget/budget.module';

@Module({
  imports: [CashMovementModule, BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
