import { MaxLength, IsString, IsNotEmpty, IsNumber, Min, IsInt, Validate } from "class-validator";
// import { ExistsInDbConstraint } from "src/exists-in-db/ExistsInDbConstraint";
// import { ExistsInDb } from "src/exists-in-db/exists-in-db.decorator";

export class CreateProductDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    price: number;

    // @Validate(ExistsInDbConstraint)
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    categoryId: number;
}
