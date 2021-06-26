import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { User } from '../auth/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  getTest(): string {
    return 'We are getting';
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<any> {
    return this.postRepository.createPost(createPostDto, user);
  }

  async deletePost(id: number, userId: number): Promise<any> {
    return this.postRepository.deletePost(id, userId);
  }

  async updatePostContent(
    id: number,
    userId: number,
    editPostDto: EditPostDto,
  ): Promise<Post> {
    return this.postRepository.updatePostContent(id, userId, editPostDto);
  }
}
