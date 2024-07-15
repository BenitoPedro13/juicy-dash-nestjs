import {
  //  Influencers,
  Performance,
  PostsType,
} from '@prisma/client';

export class CreatePostDto {
  type: PostsType;
  isVideo: boolean;
  impressions: number;
  interactions: number;
  clicks: number;
  videoViews: number;
  engagement: number;
  price: number;
  postDate: string;
  creatorId: string;
  // influencerId?: string;
  // influencer?: Influencers;
  performanceId?: number;
  performance?: Performance;
}
