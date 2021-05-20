import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from "./post.service";

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  private logger = new Logger('PostController');

  constructor(
    private postService: PostService
  ) {
  }

  @Get('/test')
  getTest(): string {
    return this.postService.getTest();
  }
}
