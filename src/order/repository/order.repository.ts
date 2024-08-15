import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { OrderInterface } from '../interface/order.interface';
import { OrderEntity } from '../entity/order.entity';
import { ObjectId } from 'mongodb';

export class OrderRepository implements OrderInterface {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: MongoRepository<OrderEntity>
  ) {}

  async findById(id: string): Promise<OrderEntity | null> {
    const objectId = new ObjectId(id); 
    return this.orderRepo.findOne({ where: { _id: objectId } });
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepo.find();
  }

  async create(order: Partial<OrderEntity>): Promise<OrderEntity> {
    const newOrder = this.orderRepo.create(order);
    return this.orderRepo.save(newOrder);
  }

  async aggregate(pipeline: any[]): Promise<any[]> {
    return this.orderRepo.aggregate(pipeline).toArray();
  }
}
