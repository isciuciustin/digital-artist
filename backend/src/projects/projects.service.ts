import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private readonly projects = [];

  create(project) {
    this.projects.push(project);
    return this.projects;
  }
  findAll() {
    return this.projects;
  }
}
