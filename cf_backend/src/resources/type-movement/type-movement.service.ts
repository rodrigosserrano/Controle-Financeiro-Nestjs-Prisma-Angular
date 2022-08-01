import { Injectable } from '@nestjs/common';
import { CreateTypeMovementDto } from './dto/create-type-movement.dto';
import { UpdateTypeMovementDto } from './dto/update-type-movement.dto';
import {PrismaService} from "../../prisma/prisma.service";
import {UtilsHelper} from "../../helpers/utils.helpers";

@Injectable()
export class TypeMovementService {

  constructor(private readonly prismaService: PrismaService) {}

  create(createTypeMovementDto: CreateTypeMovementDto) {
    return 'This action adds a new typeMovement';
  }

  async findAll() {
    const findAll = await this.prismaService.typeMovement.findMany();
    return UtilsHelper.treatmentResultJson(findAll);
  }

  findOne(id: number) {
    return `This action returns a #${id} typeMovement`;
  }

  update(id: number, updateTypeMovementDto: UpdateTypeMovementDto) {
    return `This action updates a #${id} typeMovement`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeMovement`;
  }
}
