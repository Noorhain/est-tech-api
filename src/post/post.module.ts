import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/repository/user.repository';
import { PostRepository } from './repository/post.repository';
import { PostCategory } from './entity/post-category.entity';
import { PageType } from './entity/page-type.entity';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';
import { PostService } from './post.service';
import { Page } from './entity/page.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserRepository,
      PostRepository,
      PostCategory,
      PageType,
      Page,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
