import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/repository/user.repository';
import { WebPostRepository } from './repository/web-post.repository';
import { WebPostCategory } from './entity/web-post-category.entity';
import { PageType } from './entity/page-type.entity';
import { WebPostController } from './web-post.controller';
import { AuthModule } from '../auth/auth.module';
import { WebPostService } from './web-post.service';
import { Page } from './entity/page.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserRepository,
      WebPostRepository,
      WebPostCategory,
      PageType,
      Page,
    ]),
  ],
  controllers: [WebPostController],
  providers: [WebPostService],
})
export class WebPostModule {}
