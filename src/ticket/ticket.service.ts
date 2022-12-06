import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto, ProductInTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { GetTicketDTO } from './dto/get-ticket.dto';

@Injectable()
export class TicketService {

  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<Ticket>,
    @InjectModel(Product.name)
    private readonly productModel:Model<Product>,

    private productsService: ProductService
  ){}


 async create(createTicketDto: CreateTicketDto) {
  

    let createTicket: GetTicketDTO = new GetTicketDTO();

    createTicket.products = [];

    let totalTicket = 0;

    createTicketDto.products.forEach(async element =>{
      
      let productItem = await (await this.productModel.findById({_id: element.id}));

      

      if(!productItem)
        return new NotFoundException(`product with id `);

      let productInTicket:ProductInTicketDto;

        
        createTicket.products.push({
          ...element,
          ...productItem,
          subtotal: ((await productItem).precio * element.cantidad),
           
        });

        totalTicket += (await productItem).precio * element.cantidad;

        

    });

    createTicket.folio = Math.ceil(Math.random()*100000);
    createTicket.fecha = new Date().toLocaleDateString();
    createTicket.total = totalTicket;

    const ticketF = await this.ticketModel.create(createTicket)

    return createTicket;

    
    
  }

  findAll() {
    return `This action returns all ticket`;
  }

  findOne(id: string) {
    
  }

  
}
