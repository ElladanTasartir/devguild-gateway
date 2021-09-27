import { Module } from '@nestjs/common';
import { FetchTechService } from './fetch-tech.service';
import { TechnologyController } from './tech.controller';

@Module({
  controllers: [TechnologyController],
  providers: [FetchTechService],
})
export class TechnologyModule {}
