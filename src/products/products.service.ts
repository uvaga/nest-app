import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  // your db logic
  create(product: Product): Product[] {
    this.products.push(product);
    return this.products;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    const product: Product | undefined = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  delete(id: number): Product[] {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.products.splice(index, 1);
    return this.products;
  }
}
