import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PhotoEntity } from 'src/photos/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PhotoEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
