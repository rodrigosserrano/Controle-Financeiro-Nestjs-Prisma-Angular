import { Injectable } from '@nestjs/common';
import { CreateCashMovementDto } from './dto/create-cashMovement.dto';
import { UpdateCashMovementDto } from './dto/update-cashMovement.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { UtilsHelper } from "../../helpers/utils.helpers";

@Injectable()
export class CashMovementService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: CreateCashMovementDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);

    data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    return await this.prismaService.cashMovement.create({ data });
  }

  findAll() {
    return this.prismaService.cashMovement.findMany();
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
