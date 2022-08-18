import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CashMovementService} from './cash-movement.service';
import {CreateCashMovementDto} from './dto/create-cash-movement.dto';
import {UpdateCashMovementDto} from './dto/update-cash-movement.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Cash Movement')
@Controller('cash-movement')
export class CashMovementController {
  constructor(private readonly cashMovementService: CashMovementService) {}

  @Post()
  registryCashMovement(@Body() createCashMovementDto: CreateCashMovementDto) {
    return this.cashMovementService.registryCashMovement(createCashMovementDto).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Get()
  findAll() {
    return this.cashMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashMovementService.findOne(+id).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashMovementDto: UpdateCashMovementDto) {
    return this.cashMovementService.update(+id, updateCashMovementDto).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashMovementService.remove(+id).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }
}
