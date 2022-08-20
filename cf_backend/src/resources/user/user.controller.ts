import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
