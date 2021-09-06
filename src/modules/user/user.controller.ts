import { Controller, Get, Param, Query } from '@nestjs/common';
import { FetchUsersService } from './fetch-user.service';
import { UserWithTechnology } from './interfaces/user-with-technology';
import { User } from './interfaces/user.interface';

@Controller('api/users')
export class UserController {
  constructor(private readonly fetchUsersService: FetchUsersService) {}

  @Get()
  getUsersByIds(@Query() ids: string): Promise<User[]> {
    return this.fetchUsersService.getUserByIds(ids);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.fetchUsersService.getUserById(id);
  }

  @Get('technologies/:id')
  getUserByTechnologyId(
    @Param('id') id: string,
  ): Promise<UserWithTechnology[]> {
    return this.fetchUsersService.getUsersByTechnologyId(id);
  }
}
