import { Injectable } from '@nestjs/common';
import { CreateWebPostDto } from './dto/create-web-post.dto';
import { EditWebPostDto } from './dto/edit-web-post.dto';
import { User } from '../auth/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WebPostRepository } from './repository/web-post.repository';
import { WebPost } from './entity/web-post.entity';

@Injectable()
export class WebPostService {
  constructor(
    @InjectRepository(WebPostRepository)
    private readonly webPostRepository: WebPostRepository,
  ) {}

  async getLatestPostsSummary(): Promise<[WebPost[], number]> {
    return this.webPostRepository
      .getLatestPostsSummary()
      .then((latestPosts: [WebPost[], number]): [WebPost[], number] => {
        this.getExcerpt(latestPosts[0]);
        return latestPosts;
      });
  }

  async getAllPostsByUser(user: User): Promise<WebPost[]> {
    return this.webPostRepository.getAllPostsByUser(user);
  }

  async createPost(createPostDto: CreateWebPostDto, user: User): Promise<any> {
    const { title, body, status, postCategory } = createPostDto;
    const webPost = new WebPost();
    webPost.title = title;
    webPost.body = body;
    webPost.status = status;
    webPost.postCategory = postCategory;
    webPost.user = user;
    return this.webPostRepository.createPost(webPost);
  }

  async deletePost(id: number, userId: number): Promise<any> {
    return this.webPostRepository.deletePost(id, userId);
  }

  async updatePostContent(
    id: number,
    userId: number,
    editPostDto: EditWebPostDto,
  ): Promise<WebPost> {
    const { title, body, status, postCategory } = editPostDto;
    const webPost = await this.webPostRepository.findOnePostPerIdAndUser(
      id,
      userId,
    );
    webPost.title = title;
    webPost.body = body;
    webPost.status = status;
    webPost.postCategory = postCategory;
    return this.webPostRepository.updatePostContent(webPost);
  }

  getExcerpt(latestPosts: WebPost[]): WebPost[] {
    latestPosts.forEach((webPost: WebPost): void => {
      if (webPost.body.length > 200) {
        webPost.body = webPost.body.substring(0, 200);
      }
    });
    return latestPosts;
  }
}
