import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>
    ) {}

    async create(createProjectDto: CreateProjectDto) {
        const project = await this.projectRepository.save(
            this.projectRepository.create(createProjectDto)
        );
        return project;
    }

    async findAll() {
        return await this.projectRepository.find();
    }

    async findNonHidden() {
        return await this.projectRepository
            .createQueryBuilder('project')
            .where('project.hidden = :hidden', { hidden: false })
            .getMany();
    }
    async findOne(id: number) {
        return await this.projectRepository.findOne({
            where: { id: id }
        });
    }

    async add_image_key(id: string, image_key: string) {
        const project = await this.projectRepository.update(
            { id: Number(id) },
            { image_key: image_key }
        );
        return project;
    }

    async update_project(
        id: string,
        title: string,
        description: string,
        hidden: boolean,
        customer_link: string
    ) {
        const entity = await this.projectRepository.findOneBy({
            id: Number(id)
        });
        entity.title = title;
        entity.description = description;
        entity.hidden = hidden;
        entity.customer_link = customer_link;
        return await this.projectRepository.save(entity);
    }

    async delete_project(id: number) {
        return await this.projectRepository.delete({ id });
    }
}
