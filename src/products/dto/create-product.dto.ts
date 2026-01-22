import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDetailsDTO } from './create-product-details.dto';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly qty: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProductDetailsDTO)
  readonly productDetails?: CreateProductDetailsDTO;
}
