import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from '@nestjs/common/node_modules/axios';
import { devguildTechServiceUrl } from 'src/config';
import { Technology } from '../project/interfaces/technology.interface';

@Injectable()
export class FetchTechService {
  private httpService: AxiosInstance;

  constructor() {
    this.httpService = axios.create({
      baseURL: devguildTechServiceUrl,
    });
  }

  async getAllTechnologies(): Promise<Technology[]> {
    const {
      data: {
        data: { technologies },
      },
    } = await this.httpService.post('', {
      query: `query GetAllTechnologies {
        technologies {
          id,
          name
        }
      }`,
    });

    return technologies;
  }
}
