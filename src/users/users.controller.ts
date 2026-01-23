import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<User> {
    return await this.usersService.create(user);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<UserEntity | null> {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<DeleteResult> {
    return await this.usersService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() user: UpdateUserDTO,
  ): Promise<UpdateResult> {
    return await this.usersService.update(id, user);
  }
}
