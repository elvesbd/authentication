import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join, resolve } from 'path';

const options: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: '1234qwerASB',
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
