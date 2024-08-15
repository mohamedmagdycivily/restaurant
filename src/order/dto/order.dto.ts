import { IsArray, IsDecimal, IsNotEmpty, IsObject, IsString, ValidateNested, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDTO {
  @IsString()
  name: string;

  @IsInt()
  price: number;

  @IsInt()
  quantity: number;
}

class CustomerInfoDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class CreateOrderDTO {
  @ValidateNested({ each: true })
  @Type(() => ItemDTO)
  @IsArray()
  items: ItemDTO[];

  @IsInt()
  totalPrice: number;

  @ValidateNested()
  @Type(() => CustomerInfoDTO)
  customerInfo: CustomerInfoDTO;
}

class UpdateItemDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsDecimal()
  @IsOptional()
  price: number;

  @IsInt()
  @IsOptional()
  quantity: number;
}

class UpdateCustomerInfoDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsString()
  @IsOptional()
  address: string;
}

export class UpdateOrderDTO {
  @ValidateNested({ each: true })
  @Type(() => UpdateItemDTO)
  @IsArray()
  @IsOptional()
  items?: UpdateItemDTO[];

  @IsDecimal()
  @IsOptional()
  totalPrice?: number;

  @ValidateNested()
  @Type(() => UpdateCustomerInfoDTO)
  @IsOptional()
  customerInfo?: UpdateCustomerInfoDTO;
}
