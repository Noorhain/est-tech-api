import { BadRequestException, PipeTransform } from "@nestjs/common";
import { PostCategory } from "../web-post-category.enum";

export class WebPostCategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = [PostCategory.NEWS, PostCategory.TESTS];

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
