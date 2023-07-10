import { Module } from '@nestjs/common';
import { CsvsService } from './csvs.service.ts';
import { CsvsController } from './csvs.controller.ts';

@Module({
  controllers: [CsvsController],
  providers: [CsvsService]
})
export class CsvsModule {}
