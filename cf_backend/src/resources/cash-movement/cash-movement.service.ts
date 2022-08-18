import { Injectable } from '@nestjs/common';
import { CreateCashMovementDto } from './dto/create-cash-movement.dto';
import { UpdateCashMovementDto } from './dto/update-cash-movement.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { UtilsHelper } from "../../helpers/utils.helpers";
import { CashMovimentHelpers } from "../../helpers/cashMoviment.helpers";
import { Budget } from "../budget/entities/budget.entity";

@Injectable()
export class CashMovementService {

  constructor(private readonly prismaService: PrismaService) {}

  async registryCashMovement(data: CreateCashMovementDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);

    //Pega as informações do budget
    const budget: Budget = await this.prismaService.budget.findFirst({ where: { id: data.budgetId }});

    //Formata os valores para number para que seja possível fazer a conta
    let newBalanceBudget = CashMovimentHelpers.calcCashMovement(budget, data);
    if (newBalanceBudget < 0) throw Error('Erro desconhecido');

    //Formata a data para ser salvo no banco
    data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    const updateBudget = await this.prismaService.budget.update({
      where: { id: data.budgetId },
      data: {
        cash: newBalanceBudget
      }
    });

    const createCashMovement = await this.prismaService.cashMovement.create({ data });

    return UtilsHelper.treatmentResultJson({ createCashMovement, updateBudget });
  }

  async findAll() {
    const findAll = await this.prismaService.cashMovement.findMany();
    return UtilsHelper.treatmentResultJson(findAll);
  }

  async findOne(id: number) {
    const conta = await this.prismaService.cashMovement.findFirst({ where: { id } });
    return UtilsHelper.treatmentResult(conta, UtilsHelper.NOT_FOUND_RESULT);
  }

  async update(id: number, data: UpdateCashMovementDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);

    const conta = await this.prismaService.cashMovement.findFirst({ where: { id } });
    UtilsHelper.treatmentResult(conta, 'Entrada/saida não encontrada.', true);

    if (data.dateToPay) data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    const contaUpdate = await this.prismaService.cashMovement.update({ where: { id }, data });
    return UtilsHelper.treatmentResult(contaUpdate);
  }

  async remove(id: number) {
    const conta = await this.prismaService.cashMovement.findFirst({ where: { id } });
    UtilsHelper.treatmentResult(conta, 'Entrada/saida não encontrada.', true);

    const deleteCashMovement = await this.prismaService.cashMovement.delete({ where: { id }});
    return UtilsHelper.treatmentResult(deleteCashMovement);
  }
}
