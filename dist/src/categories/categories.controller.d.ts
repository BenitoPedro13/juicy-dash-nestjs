import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CategoryClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CategoryClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
}
