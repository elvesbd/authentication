import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join, resolve } from 'path';

const options: TypeOrmModuleOptions = {
  type: process.env.TYPEORM_CONNECTION as any,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  extra: {
    options: {
      encrypt: false,
    },
  },
  entities: [resolve(__dirname, '..', 'entities', '*')],
  migrations: [resolve(__dirname, '..', 'migrations', '*')],
  cli: {
    entitiesDir: join('src', 'db', 'entities'),
    migrationsDir: join('src', 'db', 'migrations'),
  },
};

module.exports = options;
