import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { typeOrmAsyncConfig } from "./ormconfig";
const keys = require('./Config/ENV/keys');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    OrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
  exports:[
    AppService,
  ]
})
export class AppModule {}