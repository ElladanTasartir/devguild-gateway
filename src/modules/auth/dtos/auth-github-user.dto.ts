import { IsNumber, IsPositive } from 'class-validator';

export class AuthGithubUserDTO {
  @IsNumber()
  @IsPositive()
  github_id: number;
}
