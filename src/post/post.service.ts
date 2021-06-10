import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './repository/post.repository';
import { PostType } from './post-type.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  getTest(): string {
    return 'We are getting';
  }

  async createPost(
    createPostDto: CreatePostDto,
    postType: PostType,
    user: User,
  ): Promise<any> {
    if (postType === 'entry') {
      return this.postRepository.createPostEntry(createPostDto, user);
    } else {
      //return this.postRepository.createPostPage();
    }
  }
}
