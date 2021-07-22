import { EntityRepository, Repository } from 'typeorm';
import { WebPost } from '../entity/web-post.entity';
import { CreateWebPostDto } from '../dto/create-web-post.dto';
import { EditWebPostDto } from '../dto/edit-web-post.dto';
import { User } from '../../auth/entity/user.entity';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(WebPost)
export class WebPostRepository extends Repository<WebPost> {
  private logger = new Logger('PostRepository');

  async createPost(webPost: WebPost): Promise<WebPost> {
    try {
      await webPost.save();
    } catch (error) {
      this.logger.error('Error al crear un nuevo web-post: ' + error.message);
      throw new InternalServerErrorException();
    }

    delete webPost.user;
    return webPost;
  }

  async deletePost(id: number, userId: number): Promise<WebPost> {
    try {
      const webPostFound = await this.findOne({ where: { id, user: userId } });
      if (!webPostFound) {
        throw new HttpException(
          'No hemos encontrado ningún web-post que eliminar',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.remove(webPostFound);
      return webPostFound;
    } catch (error) {
      if (error.status === 404) {
        throw new HttpException(
          'No hemos encontrado ningún web-post que eliminar',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.logger.error('Error al borrar un web-post: ' + error.message);
        throw new InternalServerErrorException();
      }
    }
  }

  async findOnePostPerIdAndUser(id: number, userId: number): Promise<WebPost> {
    try {
      const webPost = await this.findOne({ where: { id, user: userId } });
      if (!webPost) {
        throw new HttpException(null, HttpStatus.NOT_FOUND);
      }
      return webPost;
    } catch (error) {
      if (error.status === 404) {
        throw new HttpException(
          'No hemos encontrado ningún web-post que actualizar',
          HttpStatus.NOT_FOUND,
        );
      } else {
        this.logger.error('Error al localizar un web-post: ' + error.message);
        throw new InternalServerErrorException();
      }
    }
  }

  async getAllPostsByUser(user: User): Promise<WebPost[]> {
    const query = this.createQueryBuilder('post');
    query.where('web-post.userID = :userID', { userID: user.id });

    try {
      const webPosts = await query.getMany();
      return webPosts;
    } catch (error) {
      this.logger.error(
        `Failed to get posts for user "${user.email}".`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getLatestPostsSummary(): Promise<[WebPost[], number]> {
    const query = this.createQueryBuilder('post');
    try {
      const webPosts = await query.getManyAndCount();
      return webPosts;
    } catch (error) {
      this.logger.error(`Failed to get latest posts summary: `, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async updatePostContent(webPost: WebPost): Promise<WebPost> {
    try {
      await this.save(webPost);
      return webPost;
    } catch (error) {
      this.logger.error('Error al actualizar un web-post: ' + error.message);
      throw new InternalServerErrorException();
    }
  }
}
