import { CreateProjectDto } from './dto/create-project-dto';
import { ProjectsService } from './projects.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Fetch project based on ${id}`;
  }
  @Put(':id')
  updateOne(@Param('id') id: string) {
    return `Update project based on ${id}`;
  }
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return `Delete project based on ${id}`;
  }
  @Post()
  createOne(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
