import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FetchProjectsService } from './fetch-project.service';
import { Project } from './interfaces/project.interface';

@Controller('api/projects')
export class ProjectController {
  constructor(private readonly fetchProjects: FetchProjectsService) {}

  @Get()
  findProjects(@Query() technologies: string): Promise<Project[]> {
    return this.fetchProjects.getProjects(technologies);
  }

  @Get(':id')
  findProjectById(@Param('id') id: string): Promise<Project> {
    return this.fetchProjects.getProjectById(id);
  }

  @Post()
  createProject(@Body() createProjectBody: any): Promise<Project> {
    return this.fetchProjects.createProject(createProjectBody);
  }

  @Post(':id/techs')
  insertTechsInProject(
    @Param('id') id: string,
    @Body() insertTechsBody: any,
  ): Promise<Project> {
    return this.fetchProjects.insertTechnologiesInProject(id, insertTechsBody);
  }
}
