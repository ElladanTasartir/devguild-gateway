import { Controller, Get } from '@nestjs/common';
import { GetAuthenticatedUser } from '../auth/decorators/auth.decorator';
import { Technology } from '../project/interfaces/technology.interface';
import { FetchTechService } from './fetch-tech.service';

@Controller('api/techs')
export class TechnologyController {
  constructor(private readonly fetchTechService: FetchTechService) {}

  @Get()
  getAllTechnologies(@GetAuthenticatedUser() _: string): Promise<Technology[]> {
    return this.fetchTechService.getAllTechnologies();
  }
}
