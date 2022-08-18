import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CashMovementService } from './cashMovement.service';
import { CreateCashMovementDto } from './dto/create-cashMovement.dto';
import { UpdateCashMovementDto } from './dto/update-cashMovement.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Cash Movement')
@Controller('cash-movement')
export class CashMovementController {
  constructor(private readonly cashMovementService: CashMovementService) {}

  @Post()
  registryCashMovement(@Body() createCashMovementDto: CreateCashMovementDto) {
    return this.cashMovementService.registryCashMovement(createCashMovementDto).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }

  @Get()
  findAll() {
    return this.cashMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashMovementService.findOne(+id).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashMovementDto: UpdateCashMovementDto) {
    return this.cashMovementService.update(+id, updateCashMovementDto).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashMovementService.remove(+id).catch((e) => {
      throw new BadRequestException(e.message);
    });
  }
}
