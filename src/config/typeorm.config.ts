import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

/*Si no ponemos el prefijo 'SRV_' a las variables de entorno, es posible que ya haya alguna en el SO con ese nombre. Es lo que pasa con USERNAME, por ejemplo.*/
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.SRV_HOSTNAME || dbConfig.host,
  port: process.env.SRV_PORT || dbConfig.port,
  username: process.env.SRV_USERNAME || dbConfig.username,
  password: process.env.SRV_PASSWORD || dbConfig.password,
  database: process.env.SRV_DB_NAME || dbConfig.database,
  autoLoadEntities:
    process.env.SRV_TYPEORM_AUTOLOAD_ENTITIES || dbConfig.autoloadEntities,
  synchronize: process.env.SRV_TYPEORM_SYNC || dbConfig.synchronize,
};
