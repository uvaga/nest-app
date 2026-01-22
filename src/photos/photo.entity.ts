import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'photos' })
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.photos, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
