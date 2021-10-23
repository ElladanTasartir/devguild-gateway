import { IsString } from 'class-validator';

export class CreateTechnologyDTO {
  @IsString()
  name: string;
}
