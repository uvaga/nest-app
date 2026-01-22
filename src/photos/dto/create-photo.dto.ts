import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDTO {
  @IsNotEmpty()
  @IsString()
  url: string;
}
