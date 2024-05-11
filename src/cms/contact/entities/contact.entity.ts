import { UserEntity } from '../../../authorization/user/entities/user.entity';
import { ResponseContactEntity } from '../entities/response-contact.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  message: string;

  @Column()
  email: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => ResponseContactEntity, (response) => response.id)
  response?: ResponseContactEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
