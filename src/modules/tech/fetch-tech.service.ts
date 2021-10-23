import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios, { AxiosInstance } from '@nestjs/common/node_modules/axios';
import { devguildTechServiceUrl } from 'src/config';
import { Technology } from './interfaces/technologies.interface';

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

  async createTechnology(name: string): Promise<Technology> {
    const { data } = await this.httpService.post('', {
      query: `mutation CreateTechnology($name: String!) {
        createTechnology(createTechnologyInput: {
          name: $name
        }) {
          id,
          name
        }
      }`,
      variables: {
        name,
      },
    });

    if (data?.errors?.length) {
      switch (data.errors[0].extensions.code) {
        case '422': {
          throw new UnprocessableEntityException(
            `Technology ${name} is already inserted`,
          );
        }
        default: {
          throw new BadRequestException(`Couldn't create technology ${name}`);
        }
      }
    }

    return data.data?.createTechnology;
  }
}
