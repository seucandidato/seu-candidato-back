import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column()
    password: string;

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;
}
