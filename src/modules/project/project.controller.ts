import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetAuthenticatedUser } from '../auth/decorators/auth.decorator';
import { FetchUsersService } from '../user/fetch-user.service';
import { ProjectMembers } from '../user/interfaces/project-members';
import { FetchProjectsService } from './fetch-project.service';
import { Project } from './interfaces/project.interface';

@Controller('api/projects')
export class ProjectController {
  constructor(
    private readonly fetchProjectsService: FetchProjectsService,
    private readonly fetchUsersService: FetchUsersService,
  ) {}

  @Get()
  findProjects(
    @Query() technologies: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<Project[]> {
    return this.fetchProjectsService.getProjects(technologies);
  }

  @Get(':id')
  findProjectById(
    @Param('id') id: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<Project> {
    return this.fetchProjectsService.getProjectById(id);
  }

  @Post()
  createProject(
    @Body() createProjectBody: any,
    @GetAuthenticatedUser() _: string,
  ): Promise<Project> {
    return this.fetchProjectsService.createProject(createProjectBody);
  }

  @Post(':id/techs')
  insertTechsInProject(
    @Param('id') id: string,
    @Body() insertTechsBody: any,
    @GetAuthenticatedUser() _: string,
  ): Promise<Project> {
    return this.fetchProjectsService.insertTechnologiesInProject(
      id,
      insertTechsBody,
    );
  }

  @Get(':id/members')
  findProjectMembers(
    @Param('id') id: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<ProjectMembers[]> {
    return this.fetchUsersService.getProjectMembers(id);
  }
}
