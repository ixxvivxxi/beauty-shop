import 'dotenv/config';
import { DataSource } from 'typeorm';
import { getOrmConfig } from './configs/orm.config';
import { ConfigService } from '@nestjs/config';

class getSettings extends ConfigService {
  get(key) {
    return process.env[key];
  }
}

export default new DataSource(getOrmConfig(new getSettings()));
