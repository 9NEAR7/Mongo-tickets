import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    descripcion: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    precio: number;
}
