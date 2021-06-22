import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';

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
}
