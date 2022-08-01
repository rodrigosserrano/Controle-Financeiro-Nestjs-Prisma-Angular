import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeMovementService } from './type-movement.service';
import { CreateTypeMovementDto } from './dto/create-type-movement.dto';
import { UpdateTypeMovementDto } from './dto/update-type-movement.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Type Movement')
@Controller('type_movement')
export class TypeMovementController {
  constructor(private readonly typeMovementService: TypeMovementService) {}

  @Post()
  create(@Body() createTypeMovementDto: CreateTypeMovementDto) {
    return this.typeMovementService.create(createTypeMovementDto);
  }

  @Get()
  findAll() {
    return this.typeMovementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeMovementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeMovementDto: UpdateTypeMovementDto) {
    return this.typeMovementService.update(+id, updateTypeMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeMovementService.remove(+id);
  }
}
