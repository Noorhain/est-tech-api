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
import { WebPostService } from './web-post.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { CreateWebPostDto } from './dto/create-web-post.dto';
import { WebPostCategoryValidationPipe } from './pipes/web-post-category-validation.pipe';
import { ContentStatusValidationPipe } from './pipes/content-status-validation.pipe';
import { EditWebPostDto } from './dto/edit-web-post.dto';
import { WebPost } from './entity/web-post.entity';

@Controller('post')
export class WebPostController {
  private logger = new Logger('PostController');

  constructor(private postService: WebPostService) {}

  /*
   * Obtiene un extracto paginado de los últimos registros en la tabla posts para mostrar en listados y enumeraciones
   */
  @Get('/postsSummary')
  GetLatestPostsSummary(): Promise<[WebPost[], number]> {
    return this.postService.getLatestPostsSummary();
  }

  @Get('/myposts')
  @UseGuards(AuthGuard())
  getAllPostsByUser(@GetUser() user: User): Promise<WebPost[]> {
    return this.postService.getAllPostsByUser(user);
  }

  @Post('/createpost')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createPost(
    @Body('postCategory', ParseIntPipe, WebPostCategoryValidationPipe)
    postCategory: number,
    @Body('status', ParseIntPipe, ContentStatusValidationPipe) status: number,
    @Body()
    createPostDto: CreateWebPostDto,
    @GetUser() user: User,
  ): Promise<any> {
    createPostDto.postCategory = postCategory;
    createPostDto.status = status;
    return this.postService.createPost(createPostDto, user);
  }

  @Patch('/:id/edit')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updatePostContent(
    @Param('id', ParseIntPipe) id: number,
    @Body('postCategory', ParseIntPipe, WebPostCategoryValidationPipe)
    postCategory: number,
    @Body('status', ParseIntPipe, ContentStatusValidationPipe) status: number,
    @Body() editPostDto: EditWebPostDto,
    @GetUser() user: User,
  ): Promise<WebPost> {
    editPostDto.postCategory = postCategory;
    editPostDto.status = status;
    return this.postService.updatePostContent(id, user.id, editPostDto);
  }

  @Delete('/:id/delete')
  @UseGuards(AuthGuard())
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(id, user.id);
  }
}
