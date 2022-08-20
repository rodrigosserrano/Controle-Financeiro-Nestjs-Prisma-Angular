import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from '../../core/services/prisma/prisma.service';
import { UtilsHelper } from "../../core/helpers/utils.helpers";

@Injectable()
export class BudgetService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateBudgetDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);
    data.initialCash = data.cash
    return await this.prismaService.budget.create({ data });
  }

  async findAll() {
    const findAll = await this.prismaService.budget.findMany();
    return UtilsHelper.treatmentResultJson(findAll);
  }

  async findOne(id: number) {
    const budget = await this.prismaService.budget.findFirst({ where: { id }});
    return UtilsHelper.treatmentResult(budget, UtilsHelper.NOT_FOUND_RESULT);
  }

  async update(id: number, data: UpdateBudgetDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);

    const budget = await this.prismaService.budget.findFirst({ where: { id }});
    UtilsHelper.treatmentResult(budget, 'Budget não encontrado.', true);

    const budgetUpdate = await this.prismaService.budget.update({ where: { id }, data });
    return UtilsHelper.treatmentResult(budgetUpdate);
  }

  async remove(id: number) {
    const budget = await this.prismaService.budget.findFirst({ where: { id }});
    UtilsHelper.treatmentResult(budget, 'Budget não encontrado.', true);
    
    const deleteBudget = await this.prismaService.budget.delete({ where: { id }})
    UtilsHelper.treatmentResult(deleteBudget);
  }
}
