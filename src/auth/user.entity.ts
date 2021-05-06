import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email']) // Define aquellas columnas de las BD que deben ser unique
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  /* async validatePassword(password: string): Promise<boolean> {
         const hash = await bcrypt.hash(password, this.salt);
         return hash === this.password;
     }*/
}
