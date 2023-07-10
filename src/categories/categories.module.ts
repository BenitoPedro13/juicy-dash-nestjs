import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service.ts';
import { CategoriesController } from './categories.controller.ts';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
