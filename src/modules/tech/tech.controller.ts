import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { GetAuthenticatedUser } from '../auth/decorators/auth.decorator';
import { Technology } from './interfaces/technologies.interface';
import { FetchTechService } from './fetch-tech.service';
import { CreateTechnologyDTO } from './dtos/create-technology.dto';

@Controller('api/techs')
export class TechnologyController {
  constructor(private readonly fetchTechService: FetchTechService) {}

  @Get()
  getAllTechnologies(@GetAuthenticatedUser() _: string): Promise<Technology[]> {
    return this.fetchTechService.getAllTechnologies();
  }

  @Post()
  createNewTechnology(
    @GetAuthenticatedUser() _: string,
    @Body(ValidationPipe) createTechnologyDTO: CreateTechnologyDTO,
  ): Promise<Technology> {
    return this.fetchTechService.createTechnology(createTechnologyDTO.name);
  }
}
