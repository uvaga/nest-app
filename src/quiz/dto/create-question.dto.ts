import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { CategoryDTO } from './create-category.dto';

export class CreateQuestionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsArray()
  categories: CategoryDTO[];
}
