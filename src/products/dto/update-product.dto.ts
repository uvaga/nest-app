import {
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductDetailsDTO } from './update-product-details.dto';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly qty?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProductDetailsDTO)
  readonly productDetails?: UpdateProductDetailsDTO;
}
