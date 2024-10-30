import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>
    ) {}

    async create(createPostDto: CreatePostDto) {
        const post = await this.postRepository.save(
            this.postRepository.create(createPostDto)
        );
        return post;
    }

    findAll() {
        return `This action returns all post`;
    }

    async findOne(id: number) {
        return await this.postRepository.findOne({
            where: { id: id }
        });
    }

    async add_image_key(id: string, image_key: string) {
        const post = await this.postRepository.update(
            { id: Number(id) },
            { image_key: image_key }
        );
        return post;
    }

    async update_post(id: string, title: string, description: string) {
        const entity = await this.postRepository.findOneBy({ id: Number(id) });
        entity.title = title;
        entity.description = description;
        return await this.postRepository.save(entity);
    }

    async delete_post(id: number) {
        return await this.postRepository.delete({ id });
    }
}
