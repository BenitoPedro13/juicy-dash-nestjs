import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        price: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        price: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        price: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    update(id: number, updateProductDto: UpdateProductDto): import(".prisma/client").Prisma.Prisma__ProductClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        price: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        price: number;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}, never, import("@prisma/client/runtime").DefaultArgs>;
}
