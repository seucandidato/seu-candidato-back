import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity('benefits')
export class BenefitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
