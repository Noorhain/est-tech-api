import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { ContentStatus } from '../content-status.enum';
import { WebPostCategory } from './web-post-category.entity';
import { PageType } from './page-type.entity';

@Entity()
export class Page extends BaseEntity {
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

  @ManyToOne((type) => PageType, (pageType) => pageType.page, {
    eager: false,
    nullable: false,
  })
  @JoinColumn()
  pageType: PageType;
}
