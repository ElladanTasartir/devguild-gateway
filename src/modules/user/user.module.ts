import { Module } from '@nestjs/common';
import { FetchUsersService } from './fetch-user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [FetchUsersService],
  exports: [FetchUsersService],
})
export class UserModule {}
