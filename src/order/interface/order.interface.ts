import { OrderEntity } from '../entity/order.entity';

export const OrderInterfaceToken = Symbol('OrderInterface');

export interface OrderInterface {
  findById(id: string): Promise<OrderEntity | null>;
  findAll(): Promise<OrderEntity[]>;
  create(order: Partial<OrderEntity>): Promise<OrderEntity>;
  aggregate(pipeline: any[]): Promise<any[]>;
}
