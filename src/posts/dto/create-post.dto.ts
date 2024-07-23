import { Attachments, PostsType, User } from '@prisma/client';

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
  creatorName: string;
  attachmentId?: number;
  attachment?: Attachments;
  userEmail?: string;
  user?: User;
}
