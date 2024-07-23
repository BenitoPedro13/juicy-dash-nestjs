import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { sortOrder, sortFields } from 'types/queyParams';
import { Posts } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFileDTO } from 'src/csvs/csvs.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: MulterFileDTO,
  ) {
    return await this.postsService.create(createPostDto, file);
  }

  @Get()
  findAll(
    @Query('_start') start?: string,
    @Query('_end') end?: string,
    @Query('_sort') sort?: string,
    @Query('_order') order?: string,
    @Query('name') nameFilterValue?: string,
  ) {
    const sortFields = (
      sort?.includes(',') ? sort?.split(',') : [sort]
    ) as sortFields<Posts>;
    const sortOrders = (
      order?.includes(',') ? order?.split(',') : [order]
    ) as sortOrder;

    return this.postsService.findAll({
      start: start ? +start : 0,
      end: end ? +end : 10,
      sort: sort ? sortFields : ['id'],
      order: order ? sortOrders : ['asc'],
      name: nameFilterValue ? nameFilterValue : null,
    });
  }

  @Get('all')
  async findAllByUser(
    @Query('email') email?: string,
    @Query('_start') start?: string,
    @Query('_end') end?: string,
    @Query('_sort') sort?: string,
    @Query('_order') order?: string,
  ) {
    const sortFields = (
      sort?.includes(',') ? sort?.split(',') : [sort]
    ) as sortFields<Posts>;
    const sortOrders = (
      order?.includes(',') ? order?.split(',') : [order]
    ) as sortOrder;

    return await this.postsService.findAllByUser({
      start: start ? +start : 0,
      end: end ? +end : 10,
      sort: sort ? sortFields : ['id'],
      order: order ? sortOrders : ['asc'],
      userEmail: email,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
