import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntry } from './post-entry.entity';

@Entity()
export class EntryCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(
    (type) => PostEntry,
    (postEntry: PostEntry) => postEntry.entryCategory,
    {
      eager: false,
    },
  )
  postEntry: PostEntry;
}
