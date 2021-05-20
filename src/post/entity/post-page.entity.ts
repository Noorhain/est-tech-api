import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PageType } from './page-type.entity';

@Entity()
export class PostPage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany((type) => PageType, (pageType) => pageType.postPage)
  pageType: PageType[];
}
