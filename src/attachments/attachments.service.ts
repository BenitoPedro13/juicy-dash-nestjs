import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAttachmentDto: CreateAttachmentDto) {
    return this.prismaService.attachments.create({
      data: createAttachmentDto,
    });
  }

  async findAll(userEmail: string) {
    return this.prismaService.attachments.findMany({
      where: {
        userEmail,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.attachments.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return this.prismaService.attachments.update({
      where: { id },
      data: updateAttachmentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.attachments.delete({
      where: { id },
    });
  }
}
