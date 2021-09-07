import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  @Get()
  @UseGuards(AuthGuard('github'))
  guardRoute() {
    return {
      ok: 'brabo',
    };
  }
}
