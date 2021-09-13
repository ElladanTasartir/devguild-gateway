import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetAuthenticatedUser } from '../auth/decorators/auth.decorator';
import { Technology } from '../project/interfaces/technology.interface';
import { FetchUsersService } from './fetch-user.service';
import { UserWithTechnology } from './interfaces/user-with-technology';
import { User } from './interfaces/user.interface';

@Controller('api/users')
export class UserController {
  constructor(private readonly fetchUsersService: FetchUsersService) {}

  @Get()
  getUsersByIds(
    @Query() ids: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<User[]> {
    return this.fetchUsersService.getUserByIds(ids);
  }

  @Get(':id')
  getUserById(
    @Param('id') id: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<User> {
    return this.fetchUsersService.getUserById(id);
  }

  @Get('technologies/:id')
  getUserByTechnologyId(
    @Param('id') id: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<UserWithTechnology[]> {
    return this.fetchUsersService.getUsersByTechnologyId(id);
  }

  @Post()
  cretenewUser(
    @Body() createUserBody: any,
    @GetAuthenticatedUser() _: string,
  ): Promise<User> {
    return this.fetchUsersService.createNewUser(createUserBody);
  }

  @Post()
  insertProjectMember(
    @Param('id') id: string,
    @Body() insertProjectMemberBody: any,
    @GetAuthenticatedUser() _: string,
  ): Promise<void> {
    return this.fetchUsersService.insertProjectMember(
      id,
      insertProjectMemberBody,
    );
  }

  @Post()
  insertTechnologiesInUser(
    @Param('id') id: string,
    @Body() insertTechnologiesInUserBody: any,
    @GetAuthenticatedUser() _: string,
  ): Promise<Technology[]> {
    return this.fetchUsersService.insertTechnologiesInUser(
      id,
      insertTechnologiesInUserBody,
    );
  }
}
