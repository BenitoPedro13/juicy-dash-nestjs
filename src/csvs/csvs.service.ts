import csvParser from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReadStream } from 'fs';
import { Influencer } from './dto/create-csv.dto';

import 'dotenv/config';
import fs from 'fs';

import path from 'path';
import { sortFields, sortOrder } from 'types/queyParams';
import { Performance, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UpdateCsvDto } from './dto/update-csv.dto';
import { getFilePath, getFilesFolderPath } from 'utils';
export type MulterFileDTO = {
  uniqueFilename: string;
  buffer: Buffer;
  originalname: string;
  userEmail: string;
};

@Injectable()
export class CsvsService {
  constructor(private readonly prisma: PrismaService) {}

  async processCsv(file: MulterFileDTO, userEmail: string): Promise<void> {
    const multerFile = {
      uniqueFilename: `${Date.now()}-${file?.originalname ?? ''}`,
      buffer: file.buffer,
      originalname: file.originalname,
      userEmail: userEmail,
    };

    // Ensure the /files directory exists
    const directoryPath = getFilesFolderPath(__dirname);

    fs.mkdirSync(directoryPath, { recursive: true });

    // Write the file to the /files folder
    const filePath = path.join(directoryPath, multerFile.uniqueFilename);

    fs.writeFile(filePath, multerFile.buffer, (error) => {
      if (error) {
        console.error('Error writing file:', error);
      }
    });

    await this.prisma.posts.deleteMany({
      where: {
        performance: {
          userEmail,
        },
      },
    });

    await this.prisma.performance.deleteMany({
      where: {
        userEmail,
      },
    });

    // id               Int      @id @default(autoincrement())
    // uniqueFilename   String
    // originalFilename String
    // fileSize         Int
    // createdAt        DateTime @default(now())
    // updatedAt        DateTime @updatedAt
    // user             User     @relation(fields: [userEmail], references: [email])
    // userEmail        String

    await this.prisma.performance.create({
      data: {
        uniqueFilename: multerFile.uniqueFilename,
        originalFilename: file.originalname,
        fileSize: file.buffer.length,
        userEmail: userEmail,
      },
    });
  }

  async getAllData(userEmail: string): Promise<{
    updatedAt: Date;
    data: Influencer[];
  }> {
    const performanceFile = await this.prisma.performance.findFirst({
      where: {
        userEmail: userEmail,
      },
    });

    if (!performanceFile) {
      return {
        updatedAt: performanceFile.updatedAt,
        data: [],
      };
    }

    const filePath = getFilePath(__dirname, performanceFile.uniqueFilename);

    try {
      const results: any[] = [];
      const stream = createReadStream(filePath);

      const result = await new Promise<Influencer[]>((resolve, reject) => {
        stream
          .pipe(csvParser())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
      });
      const response = {
        updatedAt: performanceFile.updatedAt,
        data: result,
      };
      return response;
    } catch (error) {
      console.log('error getAllData: ', error);
    }
  }

  // create(createCsvDto: CreateCsvDto) {
  //   return 'This action adds a new csv';
  // }

  async findAll({
    start,
    end,
    sort,
    order,
  }: // name,
  {
    start: number;
    end: number;
    sort: sortFields<Performance>;
    order: sortOrder;
    // name: string | null;
  }) {
    try {
      const orderBy = sort.map((item, index) => {
        return {
          [item]: order[index],
        };
      });

      const pageSize = end - start;

      const findManyPayload: Prisma.PerformanceFindManyArgs<DefaultArgs> = {
        take: pageSize,
        skip: start,
        orderBy: orderBy,
      };

      const result = await this.prisma.performance.findMany(findManyPayload);

      return {
        result,
        total: await this.prisma.performance.count(),
      };
    } catch (error) {
      console.log('CsvsService.findAll: ', error);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.performance.findUnique({ where: { id } });
    } catch (error) {
      console.log('CsvsService.findOne: ', error);
    }
  }

  // update(id: number, updateCsvDto: UpdateCsvDto) {
  //   return `This action updates a #${id} csv`;
  // }

  async update(
    id: number,
    updateCsvDto: UpdateCsvDto,
  ): Promise<Performance | null> {
    return this.prisma.performance.update({
      where: { id },
      data: updateCsvDto as any,
    });
  }

  async remove(id: number): Promise<Performance | null> {
    return this.prisma.performance.delete({ where: { id } });
  }
}
