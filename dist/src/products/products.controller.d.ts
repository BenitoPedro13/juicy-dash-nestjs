import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateProductDto: UpdateProductDto): any;
    remove(id: number): any;
}
