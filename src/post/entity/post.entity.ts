import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { ContentStatus } from '../content-status.enum';
import { PostCategory } from './post-category.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @Column()
  status: ContentStatus;

  @ManyToOne((type) => User, (user: User) => user.post, {
    eager: false,
    nullable: false,
  })
  user: User;

  @ManyToOne((type) => PostCategory, (postCategory) => postCategory.post, {
    eager: false,
    nullable: false,
  })
  @JoinColumn()
  postCategory: number;
}
