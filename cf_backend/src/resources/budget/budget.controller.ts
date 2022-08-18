import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Budget')
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetService.create(createBudgetDto).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Get()
  findAll() {
    return this.budgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(+id).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    return this.budgetService.update(+id, updateBudgetDto).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id).catch((e) => {
      throw new HttpException({
        status: HttpStatus.OK,
        body: e,
      }, HttpStatus.OK);
    });
  }
}
