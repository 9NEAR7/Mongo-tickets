import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator"




export class CreateTicketDto {

    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => ProductInTicketDto)
    products: ProductInTicketDto[];
}

export class ProductInTicketDto{

    @IsString()
    id: string

    @IsNumber()
    @IsPositive()
    cantidad: number

}
