// import fs from 'fs';
import csvParser from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
import path from 'path';
import { createReadStream } from 'fs';
// import { CreateCsvDto } from './dto/create-csv.dto';
// import { UpdateCsvDto } from './dto/update-csv.dto';

export type MulterFileDTO = {
  uniqueFilename: string;
  buffer: Buffer;
  originalname: string;
  userEmail: string;
};

@Injectable()
export class CsvsService {
  constructor(private readonly prisma: PrismaService) {}

  async processCsv(file: MulterFileDTO): Promise<void> {
    // const results = [];
    // const stream = Readable.from([file.buffer.toString()]); // Convert buffer to string

    // await new Promise<void>((resolve) => {
    //   stream
    //     .pipe(csvParser())
    //     .on('data', (data) => results.push(data))
    //     .on('end', () => resolve());
    // });

    await this.prisma.performance.deleteMany({
      where: {
        userEmail: file.userEmail,
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

    // for (const row of results) {
    await this.prisma.performance.create({
      data: {
        uniqueFilename: file.uniqueFilename,
        originalFilename: file.originalname,
        fileSize: file.buffer.length,
        userEmail: file.userEmail,
      },
    });
    // }
  }

  async getAllData(userEmail: string): Promise<any[]> {
    const performanceFile = await this.prisma.performance.findFirst({
      where: {
        userEmail: userEmail,
      },
    });

    if (!performanceFile) {
      return [];
    }

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'files',
      performanceFile.uniqueFilename,
    );

    try {
      const results: any[] = [];
      const stream = createReadStream(filePath);

      return new Promise<any[]>((resolve, reject) => {
        stream
          .pipe(csvParser())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
      });
    } catch (error) {
      console.log('error getAllData: ', error);
    }
  }

  // create(createCsvDto: CreateCsvDto) {
  //   return 'This action adds a new csv';
  // }

  // findAll() {
  //   return `This action returns all csvs`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} csv`;
  // }

  // update(id: number, updateCsvDto: UpdateCsvDto) {
  //   return `This action updates a #${id} csv`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} csv`;
  // }
}
