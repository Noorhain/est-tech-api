import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WebPost } from './web-post.entity';

@Entity()
export class WebPostCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany((type) => WebPost, (post) => post.postCategory)
  post: WebPost[];
}
