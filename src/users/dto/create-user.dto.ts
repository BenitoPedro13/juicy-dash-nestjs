// import { Campaign, Performance } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  totalInitialInvestment: number;
  estimatedExecutedInvestment: number;
  campaignName: string;
  color?: string;
  urlProfilePicture?: string;
}
