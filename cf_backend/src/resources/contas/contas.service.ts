import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { UtilsHelper } from "../../helpers/utils.helpers";

@Injectable()
export class ContasService {

  constructor(private readonly prismaService: PrismaService) {
  }

  async create(data: CreateContaDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);

    data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    return await this.prismaService.contas.create({ data });
  }

  findAll() {
    return this.prismaService.contas.findMany();
  }

  async findOne(id: number) {
    const conta = await this.prismaService.contas.findFirst({ where: { id } });
    return UtilsHelper.treatmentResult(conta, UtilsHelper.NOT_FOUND_RESULT);
  }

  async update(id: number, data: UpdateContaDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error(UtilsHelper.NOT_FOUND_DATA);

    const conta = await this.prismaService.contas.findFirst({ where: { id } });
    UtilsHelper.treatmentResult(conta, 'Conta não encontrada.', true);

    if (data.dateToPay) data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    const contaUpdate = await this.prismaService.contas.update({ where: { id }, data });
    return UtilsHelper.treatmentResult(contaUpdate);
  }

  async remove(id: number) {
    const conta = await this.prismaService.contas.findFirst({ where: { id } });
    UtilsHelper.treatmentResult(conta, 'Conta não encontrada.', true);

    const deleteConta = await this.prismaService.contas.delete({ where: { id }});
    return UtilsHelper.treatmentResult(deleteConta);
  }
}
