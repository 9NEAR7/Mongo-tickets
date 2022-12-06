import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

@Schema()
export class Product extends Document{

    @Prop({
        unique:true,
        index:true
    })
    descripcion: string;

    @Prop({
        index:true
    })
    precio: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
