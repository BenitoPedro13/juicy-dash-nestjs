import fs from 'fs';
import csvParser from 'csv-parser';
import { MulterFile } from 'multer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
// import { CreateCsvDto } from './dto/create-csv.dto';
// import { UpdateCsvDto } from './dto/update-csv.dto';

@Injectable()
export class CsvsService {
  constructor(private readonly prisma: PrismaService) {}

  async processCsv(file: MulterFile): Promise<void> {
    const results = [];
    const stream = Readable.from([file.buffer.toString()]);
    
    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve());
    });

    await this.prisma.tabela.deleteMany({}); // Remove os dados existentes da tabela

    for (const row of results) {
      await this.prisma.tabela.create({ data: row });
    }
  }

  async getAllData(): Promise<any[]> {
    return this.prisma.tabela.findMany();
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
