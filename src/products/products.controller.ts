import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { type Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async create(@Body() product: CreateProductDTO): Promise<Product[]> {
    return this.productService.create(product);
  }

  @Get()
  async find(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: string[]): Promise<Product | undefined> {
    return this.productService.findOne(Number(params['id']));
  }

  @Delete(':id')
  async delete(@Param() params: string[]): Promise<Product[]> {
    return this.productService.delete(Number(params['id']));
  }
}
