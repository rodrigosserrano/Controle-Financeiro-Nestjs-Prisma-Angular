import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {PrismaService} from "../../core/services/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {Budget} from "../budget/entities/budget.entity";
import {UtilsHelper} from "../../core/helpers/utils.helpers";
import {User} from "./entities/user.entity";
import {UnauthorizedError} from "../../core/errors/unauthorized.error";
import {HttpError} from "../../core/errors/http.error";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists: User = await this.prismaService.user.findFirst({ where: { email: createUserDto.email }});

    if (userExists) throw Error(UtilsHelper.DATA_EXISTS);

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

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async setTokenUser(id: number, jwtToken: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        refreshToken: jwtToken,
        updatedAt: new Date()
      }
    });
  }

  async findUserByToken(token: string) {
     const user = await this.prismaService.user.findFirst({
      where: { refreshToken: token },
    });

     return {
       ...user,
       password: undefined
     };
  }
}
