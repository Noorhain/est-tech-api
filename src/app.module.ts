import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
