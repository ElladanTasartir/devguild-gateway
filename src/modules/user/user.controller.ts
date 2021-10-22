import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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

  @Get('/me')
  getUserById(@GetAuthenticatedUser() user_id: string): Promise<User> {
    return this.fetchUsersService.getUserById(user_id);
  }

  @Get('technologies/:id')
  getUserByTechnologyId(
    @Param('id') id: string,
    @GetAuthenticatedUser() _: string,
  ): Promise<UserWithTechnology[]> {
    return this.fetchUsersService.getUsersByTechnologyId(id);
  }

  @Post()
  creteNewUser(
    @Body() createUserBody: any,
    @GetAuthenticatedUser() _: string,
  ): Promise<User> {
    return this.fetchUsersService.createNewUser(createUserBody);
  }

  @Put()
  updateUser(
    @Body() updateUserBody: any,
    @GetAuthenticatedUser() id: string,
  ): Promise<User> {
    return this.fetchUsersService.updateUser(id, updateUserBody);
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

  @Post('/users/process-user')
  processUserInfo(@GetAuthenticatedUser() user_id: string): Promise<void> {
    return this.fetchUsersService.processUserInfo(user_id);
  }
}
