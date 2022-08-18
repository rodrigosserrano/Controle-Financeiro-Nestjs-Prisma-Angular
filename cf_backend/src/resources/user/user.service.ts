import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "../../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {Budget} from "../budget/entities/budget.entity";
import {UtilsHelper} from "../../helpers/utils.helpers";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists: User = await this.prismaService.user.findFirst({ where: { email: createUserDto.email }});
    if (userExists) throw UtilsHelper.EMAIL_USER_EXISTS;

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        grossIncome: true,
      }
    });

    return UtilsHelper.treatmentResultJson(createUserDto);
  }

  findByEmail(email: string) {
    return `This action returns a #${email} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
