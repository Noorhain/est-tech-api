import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRoles } from '../user-roles.enum';
import { NewUserDto } from '../dto/new-user-dto';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async signUp(newUserDto: NewUserDto): Promise<User> {
    const { email, password, lastName = '', firstName = '' } = newUserDto;
    const user = new User();
    user.email = email;
    user.password = password;
    user.last_name = lastName;
    user.first_name = firstName;
    user.role = UserRoles.READER;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('email already exists');
      } else {
        this.logger.error('Error al crear el usuario: ' + error.message);
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
