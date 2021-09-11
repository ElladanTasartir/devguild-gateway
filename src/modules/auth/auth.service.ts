import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { FetchUsersService } from '../user/fetch-user.service';
import { AuthGithubUserDTO } from './dtos/auth-github-user.dto';
import { jwt } from '../../config';
import { Credentials } from './interfaces/credentials.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly fetchUsersService: FetchUsersService) {}

  private generateAuthToken(user: User) {
    const { expiresIn, secret } = jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }

  async signIn(authGithubUserDTO: AuthGithubUserDTO): Promise<Credentials> {
    const foundUser = await this.fetchUsersService.getUserByGithubId(
      authGithubUserDTO.github_id,
    );

    if (!foundUser) {
      return null;
    }

    return this.generateAuthToken(foundUser);
  }

  async signUp(body: any): Promise<Credentials> {
    const createdUser = await this.fetchUsersService.createNewUser(body);

    return this.generateAuthToken(createdUser);
  }
}
