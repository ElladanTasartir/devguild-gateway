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

  async getProjectsByUserId(user_id: string): Promise<Project[]> {
    const { data } = await this.httpService.get(`/projects/${user_id}/user`);

    return data;
  }

  async getProjectsWhereUserIsAMember(user_id: string): Promise<Project[]> {
    const { data } = await this.httpService.get<Project[]>(
      `/projects/${user_id}/project-members`,
    );

    return data;
  }

  async createProject(body: any): Promise<Project> {
    const { data } = await this.httpService.post('/projects', body);

    return data;
  }

  async updateProject(id: string, body: any): Promise<Project> {
    const { data } = await this.httpService.put(`/projects/${id}`, body);

    return data;
  }

  async insertTechnologiesInProject(id: string, body: any): Promise<Project> {
    const { data } = await this.httpService.post(`/projects/${id}/techs`, body);

    return data;
  }
}
