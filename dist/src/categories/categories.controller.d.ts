import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, updateCategoryDto: UpdateCategoryDto): any;
    remove(id: number): any;
}
