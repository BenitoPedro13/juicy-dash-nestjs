import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: number): any;
}
