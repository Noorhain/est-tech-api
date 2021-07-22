import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ContentStatus } from '../content-status.enum';

export class ContentStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [ContentStatus.DRAFT, ContentStatus.PUBLISHED];

  transform(value: number): number {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid content status`);
    }

    return value;
  }

  private isStatusValid(category: number) {
    const idx = this.allowedStatuses.indexOf(category);
    return idx !== -1;
  }
}
