import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntryCategory } from './entry-category.entity';

@Entity()
export class PostEntry extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    (type) => EntryCategory,
    (entryCategory) => entryCategory.postEntry,
  )
  entryCategory: EntryCategory[];
}
