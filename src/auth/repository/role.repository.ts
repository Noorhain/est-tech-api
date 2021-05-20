import { Role } from '../entity/role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  //
}
