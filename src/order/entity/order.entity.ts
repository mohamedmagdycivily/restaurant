import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];

  @Column('number')
  totalPrice: number;

  @Column()
  customerInfo: {
    name: string;
    contact?: string;
    address?: string;
  };

  @CreateDateColumn()
  timestamp: Date;
}
