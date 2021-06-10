import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostType } from './post-type.enum';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  private logger = new Logger('PostController');

  constructor(private postService: PostService) {}

  @Get('/test')
  getTest(): string {
    return this.postService.getTest();
  }

  @Post('/createpost')
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @Param('type') postType: PostType,
    @GetUser() user: User,
  ): any {
    return this.postService.createPost(createPostDto, postType, user);
  }
}
