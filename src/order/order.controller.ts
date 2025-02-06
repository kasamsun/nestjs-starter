import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseDto } from '../common/dto/pagination-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PaginationDto } from '../common/dto/pagination.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderService } from './order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get order list', description: 'Get order list' })
  @ApiResponse({ status: 200, type: [PaginationResponseDto<OrderResponseDto>] })
  getOrderList(@Query() pagination: PaginationDto) {
    return this.orderService.getOrderList(pagination);
  }

}
