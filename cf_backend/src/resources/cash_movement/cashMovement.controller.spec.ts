import { Test, TestingModule } from '@nestjs/testing';
import { CashMovementController } from './cashMovement.controller';
import { CashMovementService } from './cashMovement.service';

describe('EsController', () => {
  let controller: CashMovementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashMovementController],
      providers: [CashMovementService],
    }).compile();

    controller = module.get<CashMovementController>(CashMovementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
