// src/projects/projects.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // JWT guard for protecting routes

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Create a new project
  @Post()
  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    return this.projectsService.create(createProjectDto);
  }

  // List all projects
  @Get()
  async findAll(): Promise<ProjectResponseDto[]> {
    return this.projectsService.findAll();
  }

  // Get a project by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectsService.findOne(id);
  }

  // Update project details
  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    return this.projectsService.update(id, updateProjectDto);
  }

  // Delete a project
  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  async remove(@Param('id')id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
