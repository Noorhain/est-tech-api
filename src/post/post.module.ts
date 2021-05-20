import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/repository/user.repository';
import { PostRepository } from './repository/post.repository';
import { PostEntry } from './entity/post-entry.entity';
import { PostPage } from './entity/post-page.entity';
import { EntryCategory } from './entity/entry-category.entity';
import { PageType } from './entity/page-type.entity';
import { PostController } from './post.controller';
import { AuthModule } from '../auth/auth.module';
import { PostService } from './post.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserRepository,
      PostRepository,
      PostEntry,
      PostPage,
      EntryCategory,
      PageType,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
