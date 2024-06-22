import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sortFields, sortOrder } from 'types/queyParams';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

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
    name,
  }: {
    start: number;
    end: number;
    sort: sortFields<User>;
    order: sortOrder;
    name: string | null;
  }) {
    try {
      const orderBy = sort.map((item, index) => {
        return {
          [item]: order[index],
        };
      });

      const pageSize = end - start;

      const where: Prisma.UserWhereInput = name
        ? {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }
        : undefined;

      const findManyPayload: Prisma.UserFindManyArgs<DefaultArgs> = {
        take: pageSize,
        skip: start,
        orderBy: orderBy,
        include: { performances: true },
      };

      if (where !== undefined) {
        findManyPayload.where = where;
      }

      const result = await this.prisma.user.findMany(findManyPayload);

      return {
        result,
        total:
          where !== undefined
            ? await this.prisma.user.count({ where })
            : await this.prisma.user.count(),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto as any,
    });
  }

  async remove(id: number): Promise<User | null> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
