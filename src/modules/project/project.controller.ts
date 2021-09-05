import { Controller, Get, Query } from '@nestjs/common';
import { FetchProjectsService } from './fetch-project.service';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly fetchProjects: FetchProjectsService) {}

  @Get()
  redirectToProject(@Query() technologies: string) {
    return this.fetchProjects.getProjects(technologies);
  }
}
