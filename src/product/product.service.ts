import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { threadId } from 'worker_threads';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ){}


  async create(createProductDto: CreateProductDto) {
    createProductDto.descripcion = createProductDto.descripcion.toUpperCase();

    try {
      const product = await this.productModel.create(createProductDto);
      return product;
      
    } catch (error) {
      this.handleExceptions(error);
      
    }


  }

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {

    let product: Product;

    //MongoId
    if(!product && isValidObjectId(id)){
      product = await this.productModel.findById(id)
    }
    
    if(!product) throw new NotFoundException(`Product with id  "${id} " not found`)

    return product;
    
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    
    const product = await this.findOne(id);

    if(updateProductDto.descripcion)
      updateProductDto.descripcion = updateProductDto.descripcion.toUpperCase();

    try {
      await product.updateOne(updateProductDto);

      return{...product.toJSON(), ...updateProductDto}
    } catch (error) {
      this.handleExceptions(error);
    }

    

  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await product.deleteOne();
    
  }

  private handleExceptions(error:any){

    if(error.code === 11000){
      throw new BadRequestException(`Product exists in db ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can´t create Product-check server logs`)
  }
}
