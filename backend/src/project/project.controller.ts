import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    Post
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import * as fs from 'fs';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('/add_project')
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @Get('/get_projects')
    findAll() {
        return this.projectService.findAll();
    }

    @Public()
    @Get('/get_projects_non_hidden')
    findNonHidden() {
        return this.projectService.findNonHidden();
    }

    @Get('/get_project/:id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(Number(id));
    }

    @Patch('/add_image_key/:id/:image_key')
    async update(
        @Param('id') id: string,
        @Param('image_key') image_key: string
    ) {
        const current_project = await this.projectService.findOne(Number(id));

        if (current_project.image_key != '') {
            const fullPath = `./${current_project.image_key}`;
            const delete_file = await fs.promises.unlink(fullPath);
        }
        return this.projectService.add_image_key(id, image_key);
    }

    @Patch('/update_project/:id')
    update_project(
        @Param('id') id: string,
        @Body() createProjectDto: CreateProjectDto
    ) {
        return this.projectService.update_project(
            id,
            createProjectDto.title,
            createProjectDto.description,
            createProjectDto.hidden,
            createProjectDto.customer_link
        );
    }

    @Delete('/delete_project/:id')
    async delete_project(@Param('id') id: string) {
        const current_project = await this.projectService.findOne(Number(id));
        if (current_project.image_key != '') {
            const fullPath = `/${current_project.image_key}`;
            const delete_file = await fs.promises.unlink(fullPath);
        }
        return this.projectService.delete_project(Number(id));
    }
}
