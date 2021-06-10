import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => Post, (post) => post.postCategory)
  post: Post[];
}
