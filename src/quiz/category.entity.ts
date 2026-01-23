import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => QuestionEntity,
    (questionEntity) => questionEntity.categories,
  )
  questions: QuestionEntity[];
}
