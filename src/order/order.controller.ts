import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get(':id')
  // async getOrder(@Param('id') id: string): Promise<OrderEntity | null> {
  //   return this.orderService.findById(id);
  // }

  @Get()
  async getAllOrders(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDTO): Promise<OrderEntity> {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDTO): Promise<OrderEntity | null> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Get('dailySales')
  async getDailySalesReport() {
    return this.orderService.getDailySalesReport();
  }
}
