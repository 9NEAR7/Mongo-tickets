import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
      {
        name:Product.name,
        schema: ProductSchema
      }
    ]),
    ProductModule
    
    
  ]
})
export class TicketModule {}
