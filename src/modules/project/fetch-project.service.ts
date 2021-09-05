import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { devguildProjectServiceUrl } from 'src/config';
import { Project } from './interfaces/project.interface';

@Injectable()
export class FetchProjectsService {
  private httpService: AxiosInstance;

  constructor() {
    this.httpService = axios.create({
      baseURL: devguildProjectServiceUrl,
    });
  }

  async getProjects(technologies?: string): Promise<Project[]> {
    const { data } = await this.httpService.get('/projects', {
      params: technologies,
    });

    return data;
  }

  async getProjectById(id: string): Promise<Project> {
    const { data } = await this.httpService.get(`/projects/${id}`);

    return data;
  }
}
