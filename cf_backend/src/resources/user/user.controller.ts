import {Body, Controller, Delete, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {IsPublic} from "../../core/decorators/is-public.decorator";
import {HttpError} from "../../core/errors/http.error";

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto).catch((error) => {
        throw new HttpError(error.message);
    });
  }
}
