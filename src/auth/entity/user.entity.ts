import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';
import { Post } from '../../post/entity/post.entity';
import { UserRoles } from '../user-roles.enum';

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
  last_name: string;

  @Column()
  first_name: string;

  @ManyToOne((type) => Role, (role) => role.user, {
    eager: false,
    nullable: false,
  })
  role: UserRoles;

  @OneToMany((type) => Post, (post) => post.user, { eager: false })
  post: Post[];

  // Cuando se llama a este método, la aplicación ya ha localizado (si existe) a un usuario con el correo que se ha enviado desde el cliente. Lo que hace es encriptar el password que se ha recibido también desde el cliente con la salt que se encuentra en la base de datos. Luego se comprueba si el resultado coincide con la clave encriptada que hay en la BD (por eso, en el return se coteja contra THIS.password.
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
