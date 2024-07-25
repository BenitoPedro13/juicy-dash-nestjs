import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sortFields, sortOrder } from 'types/queyParams';
import { Attachments, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { MulterFileDTO } from 'src/csvs/csvs.service';
import path from 'path';
import fs from 'fs';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    return this.prisma.user.create({
      data: createUserDto as Prisma.UserCreateInput,
    });
  }

  async processProfileImage(
    file: MulterFileDTO,
    userEmail: string,
  ): Promise<void> {
    const multerFile = {
      uniqueFilename: `${Date.now()}-${userEmail}-${file?.originalname ?? ''}`,
      buffer: file.buffer,
      originalname: file.originalname,
      userEmail: userEmail,
    };
    console.log(multerFile);

    // Ensure the /files directory exists
    const directoryPath = path.join(__dirname, '..', '..', '..', 'files');
    fs.mkdirSync(directoryPath, { recursive: true });

    // Write the file to the /files folder
    const filePath = path.join(directoryPath, multerFile.uniqueFilename);

    fs.writeFile(filePath, multerFile.buffer, (error) => {
      if (error) {
        console.error('Error writing file:', error);
      }
    });

    await this.prisma.attachments.deleteMany({
      where: {
        uniqueFilename: {
          contains: userEmail,
        },
        userEmail,
      },
    });

    await this.prisma.attachments.create({
      data: {
        uniqueFilename: multerFile.uniqueFilename,
        originalFilename: file.originalname,
        fileSize: file.buffer.length,
        userEmail: userEmail,
      },
    });

    await this.prisma.user.update({
      data: {
        urlProfilePicture: `/public/${multerFile.uniqueFilename}`,
      },
      where: { email: userEmail },
    });
  }

  async processAttachment(
    file: MulterFileDTO,
    userEmail: string,
  ): Promise<Attachments> {
    const multerFile = {
      uniqueFilename: `${Date.now()}-${file?.originalname ?? ''}`,
      buffer: file.buffer,
      originalname: file.originalname,
      userEmail: userEmail,
    };
    console.log(multerFile);

    // Ensure the /files directory exists
    const directoryPath = path.join(__dirname, '..', '..', '..', 'files');
    fs.mkdirSync(directoryPath, { recursive: true });

    // Write the file to the /files folder
    const filePath = path.join(directoryPath, multerFile.uniqueFilename);

    fs.writeFile(filePath, multerFile.buffer, (error) => {
      if (error) {
        console.error('Error writing file:', error);
      }
    });

    const attachment = await this.prisma.attachments.create({
      data: {
        uniqueFilename: multerFile.uniqueFilename,
        originalFilename: file.originalname,
        fileSize: file.buffer.length,
        userEmail: userEmail,
      },
    });

    console.log('attachment', attachment);

    return attachment;
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
            isDeleted: false,
          }
        : {
            isDeleted: false,
          };

      const findManyPayload: Prisma.UserFindManyArgs<DefaultArgs> = {
        take: pageSize,
        skip: start,
        orderBy: orderBy,
        include: { performances: true },
        where: {
          isDeleted: false,
        },
      };

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

  async duplicateUser(userEmail: string) {
    try {
      const initialUser = await this.prisma.user.findUnique({
        where: {
          email: userEmail,
          isDeleted: false,
        },
      });

      if (!initialUser) {
        throw new Error('User not found or has been deleted');
      }

      // Delete non-relevant fields
      delete initialUser.id;
      delete initialUser.createdAt;
      delete initialUser.updatedAt;

      const randomNumber = Math.floor(1000 + Math.random() * 9000);

      initialUser.email = `copy-${randomNumber}-${initialUser.email}`;

      return await this.prisma.user.create({
        data: initialUser as Prisma.UserCreateInput,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id, isDeleted: false },
      include: { performances: true, attachments: true },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email, isDeleted: false },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto as Prisma.PostsUpdateInput,
    });
  }

  async remove(id: number): Promise<User | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });

    await this.prisma.performance.deleteMany({
      where: {
        user: {
          id,
        },
      },
    });

    await this.prisma.attachments.deleteMany({
      where: {
        user: {
          id,
        },
      },
    });

    return user;
  }
}
