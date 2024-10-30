import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    image_key: string;

    @Column({ default: false })
    hidden: boolean;

    @Column({ default: '' })
    customer_link: string;
}
