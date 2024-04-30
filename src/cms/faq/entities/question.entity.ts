import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('faq')
export class FaqEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}