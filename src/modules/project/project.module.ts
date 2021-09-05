import { Module } from '@nestjs/common';
import { FetchProjectsService } from './fetch-project.service';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  providers: [FetchProjectsService],
})
export class ProjectModule {}
