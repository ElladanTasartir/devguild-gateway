import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-oauth2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    const githubOptions: StrategyOptions = {
      clientID: 'something',
      clientSecret: 'something',
      scope: ['read:user'],
      authorizationURL: 'http://localhost:3000/api/auth/callback',
      tokenURL: 'http://localhost:3000/api/auth/token',
    };
    super(githubOptions);
  }
}
