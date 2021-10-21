import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { devguildUserServiceUrl } from 'src/config';
import { Technology } from '../project/interfaces/technology.interface';
import { ProjectMembers } from './interfaces/project-members';
import { UserComments } from './interfaces/user-comments';
import { UserCommentsWithUser } from './interfaces/user-comments-with-user';
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
    const { data } = await this.httpService.get<User>(`/users/${id}`);

    return data;
  }

  async getUserByIds(ids: string): Promise<User[]> {
    const { data } = await this.httpService.get<User[]>('/users', {
      params: ids,
    });

    return data;
  }

  async getUserByGithubId(id: number): Promise<User> {
    const { data } = await this.httpService.get<User>(`/users/${id}/github`);

    return data;
  }

  async getUsersByTechnologyId(id: string): Promise<UserWithTechnology[]> {
    const { data } = await this.httpService.get<UserWithTechnology[]>(
      `/users/technologies/${id}`,
    );

    return data;
  }

  async getUserCommentsByProjectId(
    id: string,
  ): Promise<UserCommentsWithUser[]> {
    const { data } = await this.httpService.get<UserCommentsWithUser[]>(
      `/projects/${id}/comments`,
    );

    return data;
  }

  async getProjectMembers(id: string): Promise<ProjectMembers[]> {
    const { data } = await this.httpService.get<ProjectMembers[]>(
      `/projects/${id}/members`,
    );

    return data;
  }

  async createNewUser(body: any): Promise<User> {
    const { data } = await this.httpService.post<User>('/users', body);

    return data;
  }

  async updateUser(id: string, body: any): Promise<User> {
    const { data } = await this.httpService.put<User>(`/users/${id}`, body);

    return data;
  }

  async insertProjectMember(id: string, user_id: string): Promise<null> {
    const { data } = await this.httpService.post<null>(
      `/projects/${id}/members`,
      {
        user_id,
      },
    );

    return data;
  }

  async insertComment(
    id: string,
    body: any,
    user_id: string,
  ): Promise<UserComments> {
    const { data } = await this.httpService.post<UserComments>(
      `projects/${id}/comments`,
      {
        ...body,
        user_id,
      },
    );

    return data;
  }

  async insertTechnologiesInUser(id: string, body: any): Promise<Technology[]> {
    const { data } = await this.httpService.post<Technology[]>(
      `/users/${id}/techs`,
      body,
    );

    return data;
  }
}
