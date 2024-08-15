import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

const keys = require('./Config/ENV/keys');

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      ...keys.dbConnection,
      type: 'mongodb',
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
      useUnifiedTopology: true, 
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    }
  }
}

export function typeOrmConfig() {
  return {
    ...keys.dbConnection,
    type: 'mongodb',
    synchronize: false,
    logging: true,
    autoLoadEntities: true,
    useUnifiedTopology: true, 
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  } as DataSourceOptions
}
