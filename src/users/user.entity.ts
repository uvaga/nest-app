import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PhotoEntity } from '../photos/photo.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => PhotoEntity, (photoEntity) => photoEntity.user, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  photos: PhotoEntity[];
}
