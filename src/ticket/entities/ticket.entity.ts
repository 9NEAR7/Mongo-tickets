import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose'

@Schema()
export class Ticket extends Document{

    @Prop()
    folio:number;

    @Prop({
        index:true
    })
    fecha: string

    @Prop({type:[Types.ObjectId], ref: 'Product'})
    products:string[];

    @Prop({
        index:true
    })
    total: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)


