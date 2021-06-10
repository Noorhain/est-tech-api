import { EntityRepository, Repository } from 'typeorm';
import { PostCategory } from '../entity/post-category.entity';
import { User } from '../../auth/entity/user.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(PostCategory)
export class EntryRepository extends Repository<PostCategory> {
  private logger = new Logger('EntryRepository');

  async createEntry(any: any, user: User): Promise<any> {
    const {} = null;
  }
}
