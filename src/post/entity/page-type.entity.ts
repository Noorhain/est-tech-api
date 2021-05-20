import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostPage } from './post-page.entity';

@Entity()
export class PageType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne((type) => PostPage, (postPage: PostPage) => postPage.pageType, {
    eager: false,
  })
  postPage: PostPage;
}
