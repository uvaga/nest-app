import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'products-details' })
export class ProductDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 45, nullable: true })
  partNumber: string;
  @Column({ length: 45, nullable: true })
  dimension: string;
  @Column('float', { nullable: true })
  weight: number;
  @Column({ length: 45, nullable: true })
  manufacturer: string;
  @Column({ length: 45, nullable: true })
  origin: string;
}
