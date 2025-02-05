import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { PrismaService } from './prisma/prisma.service';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsService } from './projects/projects.service';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [UsersModule, ProjectsModule, AuthModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProjectsService, TasksService,],
})
export class AppModule {}


