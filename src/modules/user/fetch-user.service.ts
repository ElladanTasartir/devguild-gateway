import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { devguildUserServiceUrl } from 'src/config';
import { Technology } from '../project/interfaces/technology.interface';
import { ProjectMembers } from './interfaces/project-members';
import { UserWithTechnology } from './interfaces/user-with-technology';
import { User } from './interfaces/user.interface';

@Injectable()
export class FetchUsersService {
  private httpService: AxiosInstance;

  constructor() {
    this.httpService = axios.create({
      baseURL: devguildUserServiceUrl,
    });
  }

  async getUserById(id: string): Promise<User> {
    const { data } = await this.httpService.get(`/users/${id}`);

    return data;
  }

  async getUserByIds(ids: string): Promise<User[]> {
    const { data } = await this.httpService.get('/users', {
      params: ids,
    });

    return data;
  }

  async getUsersByTechnologyId(id: string): Promise<UserWithTechnology[]> {
    const { data } = await this.httpService.get(`/users/technologies/${id}`);

    return data;
  }

  async getProjectMembers(id: string): Promise<ProjectMembers[]> {
    const { data } = await this.httpService.get(`/projects/${id}/members`);

    return data;
  }

  async createNewUser(body: any): Promise<User> {
    const { data } = await this.httpService.post('/users', body);

    return data;
  }

  async insertProjectMember(id: string, body: any): Promise<void> {
    const { data } = await this.httpService.post(
      `/projects/${id}/members`,
      body,
    );

    return data;
  }

  async insertTechnologiesInUser(id: string, body: any): Promise<Technology[]> {
    const { data } = await this.httpService.post(`/users/${id}/techs`, body);

    return data;
  }
}
