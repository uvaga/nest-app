import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly password: string;
}
