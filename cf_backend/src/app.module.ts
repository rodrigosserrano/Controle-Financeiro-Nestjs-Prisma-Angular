import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContasModule } from './resources/contas/contas.module';
import { BudgetModule } from './resources/budget/budget.module';

@Module({
  imports: [ContasModule, BudgetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
