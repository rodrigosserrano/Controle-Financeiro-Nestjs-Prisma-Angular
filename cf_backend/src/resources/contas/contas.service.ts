import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { UtilsHelper } from "../../helpers/utils.helpers";

@Injectable()
export class ContasService {

  constructor(private readonly PrismaService: PrismaService) {
  }

  async create(data: CreateContaDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error('Nenhum dado foi passado.');

    data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    return await this.PrismaService.contas.create({ data });
  }

  findAll() {
    return this.PrismaService.contas.findMany();
  }

  async findOne(id: number) {
    const conta = await this.PrismaService.contas.findFirst({ where: { id } });
    return UtilsHelper.treatmentResult(conta, 'Nenhum resultado encontrado');
  }

  async update(id: number, data: UpdateContaDto) {
    if (UtilsHelper.IsEmpty(data)) throw Error('Nenhum dado foi passado.');

    const conta = await this.PrismaService.contas.findFirst({ where: { id } });
    UtilsHelper.treatmentResult(conta, 'Conta não encontrada.', true);

    if (data.dateToPay) data.dateToPay = UtilsHelper.FormatStringData(data.dateToPay);

    const contaUpdate = await this.PrismaService.contas.update({ where: { id }, data });
    return UtilsHelper.treatmentResult(contaUpdate);
  }

  async remove(id: number) {
    const conta = await this.PrismaService.contas.findFirst({ where: { id } });
    UtilsHelper.treatmentResult(conta, 'Conta não encontrada.', true);

    const deleteConta = await this.PrismaService.contas.delete({ where: { id }});
    return UtilsHelper.treatmentResult(deleteConta);
  }
}
