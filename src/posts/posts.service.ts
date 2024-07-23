import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { sortFields, sortOrder } from 'types/queyParams';
import { Posts, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterFileDTO } from 'src/csvs/csvs.service';
import path from 'path';
import fs from 'fs';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPostDto: CreatePostDto,
    file: MulterFileDTO,
  ): Promise<Posts | null> {
    try {
      const post = await this.prisma.posts.create({
        data: createPostDto as Prisma.PostsCreateInput,
      });

      const updatedPost = await this.processPostAttachment(
        post,
        file,
        post.userEmail,
      );

      return updatedPost;
    } catch (error) {
      console.error('PostsService.create Error: ', error);
    }
  }

  async processPostAttachment(
    post: Posts,
    file: MulterFileDTO,
    userEmail: string,
  ) {
    const multerFile = {
      uniqueFilename: `${Date.now()}-postid-${post.id}-${
        file?.originalname ?? ''
      }`,
      buffer: file.buffer,
      originalname: file.originalname,
      userEmail: userEmail,
    };
    console.log(multerFile);

    // Ensure the /files directory exists
    const directoryPath = path.join(__dirname, '..', '..', '..', 'files');
    fs.mkdirSync(directoryPath, { recursive: true });

    // Write the file to the /files folder
    const filePath = path.join(directoryPath, multerFile.uniqueFilename);

    fs.writeFile(filePath, multerFile.buffer, (error) => {
      if (error) {
        console.error('Error writing file:', error);
      }
    });

    await this.prisma.attachments.deleteMany({
      where: {
        uniqueFilename: {
          contains: `postid-${post.id}`,
        },
        userEmail,
      },
    });

    const attachment = await this.prisma.attachments.create({
      data: {
        uniqueFilename: multerFile.uniqueFilename,
        originalFilename: file.originalname,
        fileSize: file.buffer.length,
        userEmail: userEmail,
      },
    });

    return await this.prisma.posts.update({
      data: {
        attachmentId: attachment.id,
      },
      include: {
        user: true,
        attachment: true,
      },
      where: { userEmail, id: post.id },
    });
  }

  async findAll({
    start,
    end,
    sort,
    order,
    name,
  }: {
    start: number;
    end: number;
    sort: sortFields<Posts>;
    order: sortOrder;
    name: string | null;
  }) {
    try {
      const orderBy = sort.map((item, index) => {
        return {
          [item]: order[index],
        };
      });

      const pageSize = end - start;

      const findManyPayload: Prisma.PostsFindManyArgs<DefaultArgs> = {
        take: pageSize,
        skip: start,
        orderBy: orderBy,
        include: {
          user: true,
          attachment: true,
        },
      };

      const result = await this.prisma.posts.findMany(findManyPayload);

      return {
        result,
        total: await this.prisma.posts.count(),
      };
    } catch (error) {
      console.log('PostsService.findAll: ', error);
    }
  }

  async findAllByUser({
    start,
    end,
    sort,
    order,
    // name,
    userEmail,
  }: {
    start: number;
    end: number;
    sort: sortFields<Posts>;
    order: sortOrder;
    // name: string | null;
    userEmail: string;
  }) {
    const orderBy = sort.map((item, index) => {
      return {
        [item]: order[index],
      };
    });

    const pageSize = end - start;

    const result = await this.prisma.posts.findMany({
      take: pageSize,
      skip: start,
      orderBy: orderBy,
      where: {
        user: {
          email: userEmail,
        },
      },
      include: {
        user: true,
        attachment: true,
      },
    });

    return {
      result,
      total: await this.prisma.posts.count({
        where: {
          user: {
            email: userEmail,
          },
        },
      }),
    };
  }

  async findOne(id: number): Promise<Posts | null> {
    try {
      return await this.prisma.posts.findUnique({
        where: { id },
        include: {
          user: true,
          attachment: true,
        },
      });
    } catch (error) {
      console.error('PostsService.findOne: ', error);
    }
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Posts | null> {
    try {
      return await this.prisma.posts.update({
        where: { id },
        data: updatePostDto as Prisma.PostsUpdateInput,
      });
    } catch (error) {
      console.error('PostsService.update: ', error);
    }
  }

  async remove(id: number): Promise<Posts | null> {
    try {
      return await this.prisma.posts.delete({ where: { id } });
    } catch (error) {
      console.error('PostsService.remove: ', error);
    }
  }
}
