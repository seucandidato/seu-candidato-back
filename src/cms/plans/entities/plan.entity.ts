import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BenefitEntity } from './benefits.entity';

@Entity('plans')
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 7, scale: 2 })
  price: number;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @ManyToMany(() => BenefitEntity, {
    cascade: true,
  })
  @JoinTable()
  benefits: BenefitEntity[];
}
