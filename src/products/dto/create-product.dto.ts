import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsInt()
  readonly id: number;
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
}
