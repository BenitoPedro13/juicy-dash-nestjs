import { Test, TestingModule } from '@nestjs/testing';
import { CsvsService } from './csvs.service';

describe('CsvsService', () => {
  let service: CsvsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvsService],
    }).compile();

    service = module.get<CsvsService>(CsvsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
