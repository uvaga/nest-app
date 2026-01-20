import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  // your db logic
  create(product: Product) {
    this.products.push(product);
    return this.products;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  delete(id: number): Product[] {
    const index = this.products.findIndex((p) => p.id === id);
    this.products.splice(index, 1);
    return this.products;
  }
}
