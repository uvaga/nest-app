import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(
    () => CategoryEntity,
    (categoryEntity) => categoryEntity.questions,
    { cascade: true },
  )
  @JoinTable({ name: 'quiz' })
  categories: CategoryEntity[];
}
