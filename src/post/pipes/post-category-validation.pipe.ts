import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { PostCategory } from '../post-category.enum';

export class PostCategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = [PostCategory.POST, PostCategory.ENTRY];

  transform(value: number): number {
    if (!this.isCategoryValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid post category`);
    }

    return value;
  }

  private isCategoryValid(category: number) {
    const idx = this.allowedCategories.indexOf(category);
    return idx !== -1;
  }
}
