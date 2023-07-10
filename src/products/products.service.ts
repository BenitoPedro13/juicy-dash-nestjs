import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.ts';
import { UpdateProductDto } from './dto/update-product.dto.ts';
import { PrismaService } from 'src/prisma/prisma.service.ts';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // DTO - Data Transfer Object
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    })
  }

  findOne(id: number) {
    return this.prisma.product.findUniqueOrThrow({
      where: {
        id,
      }
    })
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: updateProductDto
    })
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      }
    })
  }
}

