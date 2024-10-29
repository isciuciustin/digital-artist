import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    image_key: string;
}
