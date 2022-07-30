import { Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UtilsHelper } from "../../helpers/utils.helpers";

@Injectable()
export class BudgetService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateBudgetDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error('Nenhum dado foi passado.');
    return await this.prismaService.budget.create({ data });
  }

  findAll() {
    return this.prismaService.budget.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, data: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  async remove(id: number) {
    const budget = await this.prismaService.budget.findFirst({ where: { id }});
    UtilsHelper.treatmentResult(budget, 'Budget não encontrado.', true);
    
    const deleteBudget = await this.prismaService.budget.delete({ where: { id }})
    UtilsHelper.treatmentResult(deleteBudget);
  }
}
