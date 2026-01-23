import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './interfaces/user';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDTO): Promise<User> {
    // if I will save the record in user it will automatically save the record in photos
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['photos'] });
  }

  async findOne(id: number): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['photos'],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
  async update(id: number, user: UpdateUserDTO): Promise<UpdateResult> {
    return await this.usersRepository.update(id, user);
  }
}
