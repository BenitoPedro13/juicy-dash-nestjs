import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvsService, MulterFileDTO } from './csvs.service';
import { AuthGuard } from '../auth/auth.guard';
import { Influencer } from './dto/create-csv.dto';
// import { CreateCsvDto } from './dto/create-csv.dto';
// import { UpdateCsvDto } from './dto/update-csv.dto';

@Controller('csvs')
export class CsvsController {
  constructor(private readonly csvsService: CsvsService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(
    @Req() req: { user: { email: string } },
    @UploadedFile() file: MulterFileDTO,
  ): Promise<void> {
    console.log('CsvsController.uploadCsv: ', req.user);
    await this.csvsService.processCsv(file, req.user.email);
  }

  @UseGuards(AuthGuard)
  @Get('data')
  async getAllData(@Req() req: any): Promise<{
    updatedAt: Date;
    data: Influencer[];
  }> {
    const userEmail = req.user.email;

    return this.csvsService.getAllData(userEmail);
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
