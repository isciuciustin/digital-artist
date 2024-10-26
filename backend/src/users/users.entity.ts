import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}
