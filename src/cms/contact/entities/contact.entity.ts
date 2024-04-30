import { ResponseContactEntity } from '../entities/response-contact.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
