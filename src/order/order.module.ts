import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';
import { OrderRepository } from './repository/order.repository';
import { OrderInterfaceToken } from './interface/order.interface';
import { OrderController } from './order.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: OrderInterfaceToken,
      useClass: OrderRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
