import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoginController } from './login.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { SongsService } from './songs/songs.service';

@Module({
  imports: [ProjectsModule],
  controllers: [AppController, LoginController],
  providers: [AppService, SongsService],
})
export class AppModule {}
