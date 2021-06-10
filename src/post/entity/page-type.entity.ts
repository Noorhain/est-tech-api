import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class PageType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany((type) => Page, (page: Page) => page.pageType, {
    eager: false,
  })
  page: Page[];
}
