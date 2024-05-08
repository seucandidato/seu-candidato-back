import { ContactEntity } from '../../../cms/contact/entities/contact.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ default: false })
  active?: boolean;

  @Column()
  hash?: string;

  @Column()
  password: string;

  @OneToMany(() => ContactEntity, (contact) => contact.id)
  contact?: ContactEntity[];

  @Column()
  profile: number;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
