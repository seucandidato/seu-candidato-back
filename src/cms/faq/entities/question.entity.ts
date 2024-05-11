import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('faq')
export class FaqEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  question: string;

  @Column()
  response: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
