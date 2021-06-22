import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class PostCategoryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    return undefined;
  }
}
