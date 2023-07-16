import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateProductDto: UpdateProductDto): any;
    remove(id: number): any;
}
