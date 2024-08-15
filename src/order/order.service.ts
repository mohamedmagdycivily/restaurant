import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  OrderInterface,
  OrderInterfaceToken,
} from './interface/order.interface';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';
import { Redis } from 'ioredis';
const keys = require('../Config/ENV/keys');

@Injectable()
export class OrderService {
  constructor(
    @Inject(OrderInterfaceToken) private readonly orderRepo: OrderInterface,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async findById(id: string): Promise<OrderEntity | null> {
    return this.orderRepo.findById(id);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepo.findAll();
  }

  async create(createOrderDto: CreateOrderDTO): Promise<OrderEntity> {
    const order = new OrderEntity();
    let totalPrice = 0;
    order.items = createOrderDto.items;
    for (const item of order.items) {
      totalPrice += item.price * item.quantity;
    }
    order.totalPrice = parseFloat(totalPrice.toFixed(2));
    order.customerInfo = createOrderDto.customerInfo;
    return this.orderRepo.create(order);
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDTO,
  ): Promise<OrderEntity | null> {
    const existingOrder = await this.orderRepo.findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    // Update fields as necessary
    if (updateOrderDto.items) {
      existingOrder.items = updateOrderDto.items;
      let totalPrice = 0;
      for (const item of existingOrder.items) {
        totalPrice += item.price * item.quantity;
      }
      existingOrder.totalPrice = parseFloat(totalPrice.toFixed(2));
    }
    if (updateOrderDto.customerInfo) {
      existingOrder.customerInfo = updateOrderDto.customerInfo;
    }
    return this.orderRepo.create(existingOrder);
  }

  async getDailySalesReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const numberOfOrdersToday = await this.getNumberOfOrdersToday(
      today,
      tomorrow,
    );
    // check redis
    const cachedReport = await this.redis.get(today.toString());
    if (
      cachedReport &&
      JSON.parse(cachedReport).numberOfOrders === numberOfOrdersToday
    ) {
      return JSON.parse(cachedReport);
    }

    const pipeline = [
      {
        $match: {
          timestamp: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          numberOfOrders: { $sum: 1 },
          topSellingItems: { $push: '$items' },
        },
      },
      {
        $unwind: '$topSellingItems',
      },
      {
        $unwind: '$topSellingItems',
      },
      {
        $group: {
          _id: '$topSellingItems.name',
          price: { $first: '$topSellingItems.price' },
          count: { $sum: '$topSellingItems.quantity' },
          revenue: {
            $sum: {
              $multiply: [
                '$topSellingItems.quantity',
                '$topSellingItems.price',
              ],
            },
          },
          totalRevenue: { $first: '$totalRevenue' },
          numberOfOrders: { $first: '$numberOfOrders' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 0,
          itemName: '$_id',
          count: 1,
          revenue: 1,
          totalRevenue: 1,
          numberOfOrders: 1,
          price: 1,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $first: '$totalRevenue' },
          numberOfOrders: { $first: '$numberOfOrders' },
          topSellingItems: {
            $push: {
              itemName: '$itemName',
              price: '$price',
              count: '$count',
              revenue: '$revenue',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          numberOfOrders: 1,
          topSellingItems: 1,
        },
      },
    ];

    const result = await this.orderRepo.aggregate(pipeline);
    const dailySalesReport = result[0] || {
      totalRevenue: 0,
      numberOfOrders: 0,
      topSellingItems: [],
    };
    // chache to redis
    await this.redis.set(today.toString(), JSON.stringify(dailySalesReport));
    return dailySalesReport;
  }

  async getNumberOfOrdersToday(today, tomorrow) {
    const pipeline = [
      {
        $match: {
          timestamp: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $count: 'numberOfOrders',
      },
    ];

    const result = await this.orderRepo.aggregate(pipeline);
    return result[0]?.numberOfOrders || 0;
  }
}
