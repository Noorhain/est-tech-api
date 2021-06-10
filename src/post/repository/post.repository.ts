import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from '../../auth/entity/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private logger = new Logger('PostRepository');

  async createPostEntry(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<any> {
    const { title, body, status, entryCategory } = createPostDto;
    const post = new Post();
    post.title = title;
    post.body = body;
    post.status = status;
    post.user = user;

    try {
      await post.save();
      // If IsEntry, entonces método que llame a la entryRepository y le pasamos los datos que necesita para crear ese elemento en la base de datos. La tabla post_entry tendrá como ID la ID. ¿Cómo obtenemos la ID una vez hemos guardado el post?

      return post;
    } catch (error) {
      this.logger.error('Error al crear un nuevo post: ' + error.message);
      throw new InternalServerErrorException();
    }
  }
}
