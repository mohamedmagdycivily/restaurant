import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from './dto/order.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @Get(':id')
  // async getOrder(@Param('id') id: string): Promise<OrderEntity | null> {
  //   return this.orderService.findById(id);
  // }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'List of all orders.',
    type: [OrderEntity],
  })
  async getAllOrders(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDTO })
  @ApiBody({
    description: 'Order creation payload',
    type: CreateOrderDTO,
    examples: {
      example1: {
        summary: 'Example Order',
        value: {
          items: [
            {
              name: 'pizza',
              quantity: 1,
              price: 100,
            },
          ],
          customerInfo: {
            name: 'magdy',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The newly created order.',
    type: OrderEntity,
  })
  async createOrder(
    @Body() createOrderDto: CreateOrderDTO,
  ): Promise<OrderEntity> {
    return this.orderService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing order by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDTO })
  @ApiResponse({
    status: 200,
    description: 'The updated order.',
    type: OrderEntity,
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDTO,
  ): Promise<OrderEntity | null> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Get('dailySales')
  @ApiOperation({ summary: 'Get the daily sales report' })
  @ApiResponse({ status: 200, description: 'The daily sales report.' })
  async getDailySalesReport() {
    return this.orderService.getDailySalesReport();
  }
}
