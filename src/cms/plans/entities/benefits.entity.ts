import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('benefits')
export class BenefitEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  title: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
