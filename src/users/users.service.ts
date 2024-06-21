import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sortFields, sortOrder } from 'types/queyParams';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return this.prisma.user.create({ data: createUserDto as any });
  }

  async findAll({
    start,
    end,
    sort,
    order,
  }: {
    start: number;
    end: number;
    sort: sortFields<User>;
    order: sortOrder;
  }): Promise<User[]> {
    try {
      console.log('sort :', sort);
      console.log('order :', order);

      const orderBy = sort.map((item, index) => {
        return {
          [item]: order[index],
        };
      });

      const pageSize = end - start;

      return this.prisma.user.findMany({
        take: pageSize,
        skip: start,
        orderBy: orderBy,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto as any,
    });
  }

  async remove(id: number): Promise<User | null> {
    return this.prisma.user.delete({ where: { id } });
  }
}
