import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  //
}
