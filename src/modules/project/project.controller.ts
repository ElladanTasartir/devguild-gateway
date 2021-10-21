import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetAuthenticatedUser } from '../auth/decorators/auth.decorator';
import { FetchUsersService } from '../user/fetch-user.service';
import { ProjectMembers } from '../user/interfaces/project-members';
import { UserComments } from '../user/interfaces/user-comments';
import { UserCommentsWithUser } from '../user/interfaces/user-comments-with-user';
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

  @Get('/user/id')
  findProjectsByUserId(
    @GetAuthenticatedUser() user_id: string,
  ): Promise<Project[]> {
    return this.fetchProjectsService.getProjectsByUserId(user_id);
  }

  @Get('/user/member')
  findProjectsWhereUserIsAMember(
    @GetAuthenticatedUser() user_id: string,
  ): Promise<Project[]> {
    return this.fetchProjectsService.getProjectsWhereUserIsAMember(user_id);
  }

  @Get(':id/comments')
  getUserCommentsByProjectId(
    @Param('id') id: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<UserCommentsWithUser[]> {
    return this.fetchUsersService.getUserCommentsByProjectId(id);
  }

  @Post()
  createProject(
    @Body() createProjectBody: any,
    @GetAuthenticatedUser() user_id: string,
  ): Promise<Project> {
    return this.fetchProjectsService.createProject({
      ...createProjectBody,
      user_id,
    });
  }

  @Put(':id')
  updateProject(
    @GetAuthenticatedUser() user_id: string,
    @Param('id') id: string,
    @Body() updateProjectBody: any,
  ): Promise<Project> {
    return this.fetchProjectsService.updateProject(id, {
      ...updateProjectBody,
      user_id,
    });
  }

  @Post(':id/comments')
  insertComment(
    @Param('id') id: string,
    @Body() insertCommentBody: any,
    @GetAuthenticatedUser() user_id: string,
  ): Promise<UserComments> {
    return this.fetchUsersService.insertComment(id, insertCommentBody, user_id);
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

  @Post(':id/members')
  insertProjectMember(
    @Param('id') id: string,
    @GetAuthenticatedUser() user_id: string,
  ): Promise<void> {
    return this.fetchUsersService.insertProjectMember(id, user_id);
  }
}
