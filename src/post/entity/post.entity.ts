import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { PostStatus } from '../post-status.enum';
import { PostEntry } from './post-entry.entity';
import { PostPage } from './post-page.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  creation_date: Date;

  @Column({ type: 'datetime' })
  last_modified: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column()
  status: PostStatus;

  @ManyToOne((type) => User, (user: User) => user.post, { eager: false })
  user: User;

  @OneToOne(() => PostEntry)
  @JoinColumn()
  postEntry: PostEntry;

  @OneToOne(() => PostPage)
  @JoinColumn()
  postType: PostPage;
}
