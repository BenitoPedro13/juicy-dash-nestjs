import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto.ts';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
