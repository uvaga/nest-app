import {
  Controller,
  Get,
  Req,
  Query,
  Put,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { type Request } from 'express';

interface GetProductsQueryDto {
  page?: number;
  limit?: number;
}
@Controller('products')
export class ProductsController {
  @Get()
  getAllProducts(
    @Req()
    request: Request,
    @Query() query: GetProductsQueryDto,
  ) {
    return { msg: 'FIND ALL', ...query };
  }

  @Put(':id')
  update(@Param('id') id: number): string {
    return 'UPDATE ENDPOINT ' + id;
  }

  @Delete()
  delete(): string {
    return 'DELETE ENDPOINT';
  }

  @Get('ab*cd')
  pattern(): string {
    return 'PATTERN MATCHED';
  }
  @Get(':id')
  @HttpCode(203)
  findOne(@Param('id') id: string): string {
    return `FIND ONE ENDPOINT ${id}`;
  }
}
