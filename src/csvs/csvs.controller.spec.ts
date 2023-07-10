import { Test, TestingModule } from '@nestjs/testing';
import { CsvsController } from './csvs.controller.ts';
import { CsvsService } from './csvs.service.ts';

describe('CsvsController', () => {
  let controller: CsvsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvsController],
      providers: [CsvsService],
    }).compile();

    controller = module.get<CsvsController>(CsvsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
