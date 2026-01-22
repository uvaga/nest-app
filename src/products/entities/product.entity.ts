import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProductDetailsEntity } from './product-details.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  name: string;
  @Column('int')
  qty: number;
  @Column('float')
  price: number;

  @OneToOne((): typeof ProductDetailsEntity => ProductDetailsEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  productDetails: ProductDetailsEntity;
}
