import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Replace with the path to your Prisma service
import { Campaign } from '@prisma/client';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCampaignDto): Promise<Campaign> {
    return this.prisma.campaign.create({ data: { ...CreateCampaignDto } });
  }

  async findAll(): Promise<Campaign[]> {
    return this.prisma.campaign.findMany();
  }

  async findOne(id: number): Promise<Campaign> {
    return this.prisma.campaign.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCampaignDto): Promise<Campaign> {
    return this.prisma.campaign.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Campaign> {
    return this.prisma.campaign.delete({ where: { id } });
  }
}
