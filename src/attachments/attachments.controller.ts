import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AttachmentsService } from './attachments.service';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { v4 as uuidv4 } from 'uuid';
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueFilename = `${Date.now()}-${uuidv4()}-${
            file.originalname
          }`;
          callback(null, uniqueFilename);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);

    const createdAttachment = await this.attachmentsService.create({
      uniqueFilename: file.filename,
      originalFilename: file.originalname,
      fileSize: file.size,
    });

    return {
      originalFilename: createdAttachment.originalFilename,
      message: 'File uploaded successfully.',
    };
  }

  @Get()
  async findAll() {
    return this.attachmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.attachmentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAttachmentDto: UpdateAttachmentDto,
  ) {
    return this.attachmentsService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.attachmentsService.remove(id);
  }
}
