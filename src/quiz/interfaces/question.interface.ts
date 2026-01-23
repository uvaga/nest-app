import { Category } from './category.interface';

export interface Question {
  id?: number;
  title: string;
  text: string;
  categories: Category[];
}
