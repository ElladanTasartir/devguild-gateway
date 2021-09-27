import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { TechnologyModule } from './modules/tech/tech.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ProjectModule, UserModule, TechnologyModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
