import { EntityRepository, Repository } from 'typeorm';
import { WebPostCategory } from '../entity/web-post-category.entity';
import { User } from '../../auth/entity/user.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(WebPostCategory)
export class EntryRepository extends Repository<WebPostCategory> {
  private logger = new Logger('EntryRepository');

  async createEntry(any: any, user: User): Promise<any> {
    const {} = null;
  }
}
