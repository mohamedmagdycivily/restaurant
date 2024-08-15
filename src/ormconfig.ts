import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

const keys = require('./Config/ENV/keys');

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      "url": process.env.MONGO_URL || keys.dbConnection.url,
      type: 'mongodb',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      useUnifiedTopology: true, 
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    }
  }
}

export function typeOrmConfig() {
  return {
    "url": process.env.MONGO_URL || keys.dbConnection.url,
    type: 'mongodb',
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    useUnifiedTopology: true, 
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  } as DataSourceOptions
}
