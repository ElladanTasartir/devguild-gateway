import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGithubUserDTO } from './dtos/auth-github-user.dto';
import { Credentials } from './interfaces/credentials.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/github')
  signIn(
    @Body(ValidationPipe) authGithubUserDTO: AuthGithubUserDTO,
  ): Promise<Credentials> {
    return this.authService.signIn(authGithubUserDTO);
  }

  @Post('/github/new-user')
  signUpAndSignIn(@Body() body: any): Promise<Credentials> {
    return this.authService.signUp(body);
  }
}
