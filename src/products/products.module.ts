import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.ts';
import { ProductsController } from './products.controller.ts';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
