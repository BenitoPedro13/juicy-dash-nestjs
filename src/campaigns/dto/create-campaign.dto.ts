import { User } from '.prisma/client';

export class CreateCampaignDto {
  name: string;
  totalInitialInvestment: number;
  estimatedExecutedInvestment: number;
  userId: number;
}
