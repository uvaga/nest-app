import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
  id?: number;
  @IsNotEmpty()
  @IsString()
  name: string;
}
// tslint:disable-next-line:max-classes-per-file
export class CreateCategoryDTO {
  categories: CategoryDTO[];
}
