import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, UpdateProduct } from './interfaces/product.interface';
import { ProductEntity } from './entities/product.entity';
import { ProductDetailsEntity } from './entities/product-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductDetailsEntity)
    private readonly productDetailsRepository: Repository<ProductDetailsEntity>,
  ) {}

  products: Product[] = [];

  async create(productDto: CreateProductDTO): Promise<Product> {
    const product = this.productRepository.create(productDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productDetails'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async delete(id: number): Promise<DeleteResult> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return await this.productRepository.delete(id);
  }

  async update(id: number, updateDto: UpdateProduct): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productDetails'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateDto.name !== undefined) product.name = updateDto.name;
    if (updateDto.qty !== undefined) product.qty = updateDto.qty;
    if (updateDto.price !== undefined) product.price = updateDto.price;

    if (updateDto.productDetails) {
      if (product.productDetails) {
        Object.assign(product.productDetails, updateDto.productDetails);
      } else {
        const newDetails = this.productDetailsRepository.create(
          updateDto.productDetails,
        );
        product.productDetails = newDetails;
      }
    }

    return await this.productRepository.save(product);
  }
}
