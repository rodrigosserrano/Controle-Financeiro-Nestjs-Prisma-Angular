import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "../../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
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
