import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvsService } from './csvs.service';
import { MulterFile } from 'multer';
// import { CreateCsvDto } from './dto/create-csv.dto';
// import { UpdateCsvDto } from './dto/update-csv.dto';

@Controller('csvs')
export class CsvsController {
  constructor(private readonly csvsService: CsvsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: MulterFile): Promise<void> {
    await this.csvsService.processCsv(file);
  }

  @Get('data')
  async getAllData(): Promise<any[]> {
    return this.csvsService.getAllData();
  }

  // @Post()
  // create(@Body() createCsvDto: CreateCsvDto) {
  //   return this.csvsService.create(createCsvDto);
  // }

  // @Get()
  // findAll() {
  //   return this.csvsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.csvsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCsvDto: UpdateCsvDto) {
  //   return this.csvsService.update(+id, updateCsvDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.csvsService.remove(+id);
  // }
}
