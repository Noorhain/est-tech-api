import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ContentStatus } from '../content-status.enum';
import { EntryCategory } from '../entry-category.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  body?: string;

  @IsString()
  @IsNotEmpty()
  status: ContentStatus;

  @IsNumber()
  @IsNotEmpty()
  entryCategory?: EntryCategory;

  @IsNumber()
  @IsNotEmpty()
  pageType?: any;
}
