import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAttachmentDto: CreateAttachmentDto) {
    return this.prismaService.metric.create({
      data: createAttachmentDto,
    });
  }

  findAll() {
    return this.prismaService.metric.findMany();
  }

  findOne(id: number) {
    return this.prismaService.metric.findUnique({
      where: { id },
    });
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return this.prismaService.metric.update({
      where: { id },
      data: updateAttachmentDto,
    });
  }

  remove(id: number) {
    return this.prismaService.metric.delete({
      where: { id },
    });
  }
}
