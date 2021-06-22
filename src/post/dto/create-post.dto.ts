import { IsNotEmpty, IsString } from 'class-validator';
import { ContentStatus } from '../content-status.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body?: string;

  @IsString()
  @IsNotEmpty()
  status: ContentStatus;

  //@IsNumber() Cuando lo procesemos vía cliente
  @IsNotEmpty()
  postCategory?: number;
}
