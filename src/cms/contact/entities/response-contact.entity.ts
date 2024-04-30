import { ContactEntity } from 'src/cms/contact/entities/contact.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('response_contact')
export class ResponseContactEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => ContactEntity, (contact) => contact.response)
  contact: ContactEntity;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;
}
