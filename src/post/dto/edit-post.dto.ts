import { IsNotEmpty, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body?: string;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  postCategory: number;
}
