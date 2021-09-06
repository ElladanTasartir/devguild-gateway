import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FetchProjectsService } from './fetch-project.service';
import { ProjectController } from './project.controller';

@Module({
  imports: [UserModule],
  controllers: [ProjectController],
  providers: [FetchProjectsService],
})
export class ProjectModule {}
