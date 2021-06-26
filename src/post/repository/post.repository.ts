import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entity/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { EditPostDto } from '../dto/edit-post.dto';
import { User } from '../../auth/entity/user.entity';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ContentStatus } from '../content-status.enum';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private logger = new Logger('PostRepository');

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, body, status, postCategory } = createPostDto;
    const post = new Post();
    post.title = title;
    post.body = body;
    post.status = status;
    post.postCategory = postCategory;
    post.user = user;

    try {
      await post.save();
      // If IsEntry, entonces método que llame a la entryRepository y le pasamos los datos que necesita para crear ese elemento en la base de datos. La tabla post_entry tendrá como ID la ID. ¿Cómo obtenemos la ID una vez hemos guardado el post?
    } catch (error) {
      this.logger.error('Error al crear un nuevo post: ' + error.message);
      throw new InternalServerErrorException();
    }

    delete post.user;
    return post;
  }

  async deletePost(id: number, userId: number): Promise<any> {
    try {
      const postFound = await this.findOne({ where: { id, user: userId } });
      if (!postFound) {
        throw new HttpException(
          'No hemos encontrado ningún post que eliminar',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.remove(postFound);
      return postFound;
    } catch (error) {
      if (error.status === 404) {
        throw new HttpException(
          'No hemos encontrado ningún post que eliminar',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.logger.error('Error al borrar un post: ' + error.message);
        throw new InternalServerErrorException();
      }
    }
  }

  async updatePostContent(
    id: number,
    userId: number,
    editPostDto: EditPostDto,
  ): Promise<Post> {
    const { title, body, status, postCategory } = editPostDto;
    try {
      const post = await this.findOne({ where: { id, user: userId } });
      if (!post) {
        throw new HttpException(
          'No hemos encontrado ningún post que actualizar',
          HttpStatus.NOT_FOUND,
        );
      }

      post.title = title;
      post.body = body;
      post.status = status;
      post.postCategory = postCategory;
      await this.save(post);

      return post;
    } catch (error) {
      if (error.status === 404) {
        throw new HttpException(
          'No hemos encontrado ningún post que actualizar',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.logger.error('Error al borrar un post: ' + error.message);
        throw new InternalServerErrorException();
      }
    }
  }
}
