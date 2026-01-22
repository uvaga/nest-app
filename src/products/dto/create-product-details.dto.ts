import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDetailsDTO {
  @IsOptional()
  @IsString()
  readonly partNumber: string;

  @IsOptional()
  @IsString()
  readonly dimension: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly weight: number;

  @IsOptional()
  @IsString()
  readonly manufacturer: string;

  @IsOptional()
  @IsString()
  readonly origin: string;
}
