import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const getOrmConfig = (config: ConfigService): MysqlConnectionOptions => {
  return {
    type: config.get('DB_TYPE'),
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE'),
    synchronize: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  };
};
