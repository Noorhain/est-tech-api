import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
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
import { PostCategoryValidationPipe } from './pipes/post-category-validation.pipe';
import { ContentStatusValidationPipe } from './pipes/content-status-validation.pipe';
import { EditPostDto } from './dto/edit-post.dto';

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
    @Body('postCategory', ParseIntPipe, PostCategoryValidationPipe)
    postCategory: number,
    @Body('status', ParseIntPipe, ContentStatusValidationPipe) status: number,
    @Body()
    createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<any> {
    createPostDto.postCategory = postCategory;
    createPostDto.status = status;
    return this.postService.createPost(createPostDto, user);
  }

  @Patch('/:id/edit')
  @UsePipes(ValidationPipe)
  updatePostContent(
    @Param('id', ParseIntPipe) id: number,
    @Body('postCategory', ParseIntPipe, PostCategoryValidationPipe)
    postCategory: number,
    @Body('status', ParseIntPipe, ContentStatusValidationPipe) status: number,
    @Body() editPostDto: EditPostDto,
    @GetUser() user: User,
  ): Promise<any> {
    editPostDto.postCategory = postCategory;
    editPostDto.status = status;
    return this.postService.updatePostContent(id, user.id, editPostDto);
  }

  @Delete('/delete/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(id, user.id);
  }
}
