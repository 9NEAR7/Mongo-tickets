import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Mongoose } from 'mongoose';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { TicketModule } from './ticket/ticket.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
    MongooseModule.forRoot('mongodb://localhost:27017/ticket-mongo'),
    ProductModule,
    TicketModule
  ],
})
export class AppModule {}
